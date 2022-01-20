# auto commit docs

rm ../csv-to-custom-json.wiki/*
cp -pR docs/* ../csv-to-custom-json.wiki/

cd ../csv-to-custom-json.wiki
git add .
git commit -m "update-docs"
git push
cd ../csv-to-custom-json
pwd
git add docs/
git commit -m "auto-update-docs"
git push
