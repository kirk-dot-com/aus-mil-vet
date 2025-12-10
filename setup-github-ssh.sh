#!/bin/bash

# GitHub SSH Key Setup Script
# This script generates an SSH key and prepares it for GitHub

set -e  # Exit on error

echo "🔑 GitHub SSH Key Setup"
echo "======================="
echo ""

# Prompt for email
read -p "Enter your GitHub email address: " email

if [ -z "$email" ]; then
    echo "❌ Email is required!"
    exit 1
fi

echo ""
echo "📝 Generating SSH key..."
ssh-keygen -t ed25519 -C "$email"

echo ""
echo "🚀 Starting ssh-agent..."
eval "$(ssh-agent -s)"

echo ""
echo "➕ Adding SSH key to ssh-agent..."
ssh-add ~/.ssh/id_ed25519

echo ""
echo "📋 Your public SSH key (copied to clipboard):"
echo "=============================================="
cat ~/.ssh/id_ed25519.pub
cat ~/.ssh/id_ed25519.pub | pbcopy

echo ""
echo "✅ SSH key has been copied to your clipboard!"
echo ""
echo "📌 Next steps:"
echo "  1. Go to https://github.com/settings/ssh/new"
echo "  2. Paste your key (already in clipboard)"
echo "  3. Give it a title (e.g., 'MacBook Pro')"
echo "  4. Click 'Add SSH key'"
echo ""
echo "  Then run: git push -u origin main"
echo ""
