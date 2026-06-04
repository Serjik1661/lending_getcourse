from __future__ import annotations

from dataclasses import dataclass
from encodings import cp1251
from pathlib import Path
import sys


REPO_ROOT = Path(__file__).resolve().parents[1]
ALLOWED_SUFFIXES = {
    ".css",
    ".html",
    ".js",
    ".json",
    ".md",
    ".py",
    ".txt",
    ".webmanifest",
    ".xml",
}
SKIP_DIRS = {".git", "node_modules", "dist", "build", "docs/archive"}
CP1251_REVERSE = {ch: i for i, ch in enumerate(cp1251.decoding_table) if ch != "\ufffe"}


@dataclass
class Issue:
    path: Path
    line_no: int
    original: str
    recovered: str


def recover_line(line: str) -> str | None:
    if all(ord(ch) < 128 for ch in line):
        return None

    raw = bytearray()
    for ch in line:
        codepoint = ord(ch)
        if codepoint <= 0xFF:
            raw.append(codepoint)
            continue
        byte_value = CP1251_REVERSE.get(ch)
        if byte_value is None:
            return None
        raw.append(byte_value)

    try:
        recovered = raw.decode("utf-8")
    except UnicodeDecodeError:
        return None

    return recovered if recovered != line else None


def should_skip(path: Path) -> bool:
    path_text = path.as_posix()
    return any(part in path.parts for part in SKIP_DIRS) or path_text.startswith("docs/archive/")


def iter_text_files() -> list[Path]:
    files: list[Path] = []
    for path in sorted(REPO_ROOT.rglob("*")):
        if not path.is_file():
            continue
        if should_skip(path):
            continue
        if path.suffix.lower() not in ALLOWED_SUFFIXES and path.name != "site.webmanifest":
            continue
        files.append(path)
    return files


def main() -> int:
    issues: list[Issue] = []

    for path in iter_text_files():
        try:
            text = path.read_text(encoding="utf-8-sig")
        except UnicodeDecodeError:
            print(f"INVALID UTF-8: {path.relative_to(REPO_ROOT)}")
            return 1

        for line_no, line in enumerate(text.splitlines(), start=1):
            recovered = recover_line(line)
            if recovered is not None:
                issues.append(
                    Issue(
                        path=path,
                        line_no=line_no,
                        original=line,
                        recovered=recovered,
                    )
                )

    if issues:
        print("Suspicious text encoding found:")
        for issue in issues[:40]:
            rel = issue.path.relative_to(REPO_ROOT)
            print(f"- {rel}:{issue.line_no}")
            print(f"  original : {issue.original}")
            print(f"  recovered: {issue.recovered}")
        if len(issues) > 40:
            print(f"... and {len(issues) - 40} more")
        return 1

    print("Encoding check passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

