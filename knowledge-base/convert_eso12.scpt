
set sourcePath to "/Users/kirkjohnstone/.gemini/antigravity/playground/cosmic-belt/knowledge-base/ESO-12.numbers"
set destPath to "/Users/kirkjohnstone/.gemini/antigravity/playground/cosmic-belt/knowledge-base/ESO-12.csv"

tell application "Numbers"
    activate
    with timeout of 60 seconds
        set theDoc to open (POSIX file sourcePath)
        export theDoc to (POSIX file destPath) as CSV
        close theDoc saving no
    end timeout
end tell
