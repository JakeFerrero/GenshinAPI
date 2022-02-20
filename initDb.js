const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');

sqlite.open({
  filename: 'genshin_api_db',
  driver: sqlite3.Database
}).then(async (db) => {
  try {
    await db.exec('CREATE TABLE characters (\
      name TEXT NOT NULL UNIQUE,\
      weapon TEXT NOT NULL,\
      vision TEXT NOT NULL,\
      rarity NUMBER NOT NULL,\
      affiliation TEXT \
    )');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Diluc", "Claymore", "Pyro", 5, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Ayaka", "Sword", "Cryo", 5, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Childe", "Bow", "Hydro", 5, "Snezhnaya")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Ganyu", "Bow", "Cryo", 5, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Hu Tao", "Polearm", "Pyro", 5, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Itto", "Claymore", "Geo", 5, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Klee", "Catalyst", "Pyro", 5, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Fischl", "Bow", "Electro", 4, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Bennett", "Sword", "Pyro", 4, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Albedo", "Sword", "Geo", 5, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Chongyun", "Claymore", "Cryo", 4, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Xingqiu", "Sword", "Hydro", 4, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Zhongli", "Polearm", "Geo", 5, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Venti", "Bow", "Anemo", 5, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Xiao", "Polearm", "Anemo", 5, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Raiden Shogun", "Polearm", "Electro", 5, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Kujou Sara", "Bow", "Electro", 4, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Mona", "Catalyst", "Hydro", 5, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Gorou", "Bow", "Geo", 4, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Keqing", "Sword", "Electro", 5, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Yoimiya", "Bow", "Pyro", 5, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Amber", "Bow", "Pyro", 4, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Yun Jin", "Polearm", "Geo", 5, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Qiqi", "Sword", "Cryo", 5, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Yae Miko", "Catalyst", "Electro", 5, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Lisa", "Catalyst", "Electro", 4, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Kaeya", "Sword", "Cryo", 4, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Sayu", "Claymore", "Anemo", 4, "Inazuma")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Rosaria", "Polearm", "Cryo", 4, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Ningguang", "Catalyst", "Geo", 4, "Liyue")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Noelle", "Claymore", "Geo", 4, "Mondstadt")');
    await db.run('INSERT OR IGNORE INTO characters (name, weapon, vision, rarity, affiliation) VALUES ("Razor", "Claymore", "Electro", 4, "Mondstadt")');
  } catch (error) {
    console.log('Error creating "characters" table!');
    throw error;
  }
}).catch(error => {
  console.log('Error initializing database: ', error);
});
