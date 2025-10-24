find . -type f -name ".DS_Store" -delete
cd chrome
zip -r chrome.zip . --exclude ".git/*" --exclude "release.sh" --exclude .DS_Store
mv chrome.zip ~/Downloads/persian-date-chrome.zip
cd ..
cd firefox
zip -r firefox.zip . --exclude ".git/*" --exclude "release.sh" --exclude .DS_Store
mv firefox.zip ~/Downloads/persian-date-firefox.zip