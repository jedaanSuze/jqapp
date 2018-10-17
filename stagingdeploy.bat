call gulp build --env=development
cd dist
call gcloud app deploy --project "analog-patrol-217713" --verbosity="error" --no-stop-previous-version -v %1
cd..
