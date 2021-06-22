# GenshinAPI
API Simulating Genshin Impact gacha

docker run -it -p 27017:27017 --name mongodb -d mongo
docker exec -d mongodb mongo genshin-api --eval 'db.createCollection("characters")'