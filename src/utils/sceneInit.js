import { wizardModel } from "../models/wizardModel";
import { tableModel } from "../models/tableModel";
import { shelfModel } from "../models/shelfModel";
import { bookShelfModel } from "../models/shelfModel";
import { dragonModel } from "../models/birdModel";
import { stachCauldronModel } from "../models/stackCauldron";
import { scrollModel } from "../models/bookModel";
import {
  magicCauldronModel,
  magicVaseModel,
  chestModel,
  grassModel,
} from "../models/magicItem";
import { skyModel } from "../models/skyModel";
import { floatingCity, animatedWizardTower } from "../models/islandModel";
import { ghostModel } from "../models/ghostModel";

export async function initializeScene(scene, camera, islandTopY = 400) {
  // Initialize and position each model
  const wizard = await wizardModel(scene, camera);
  wizard.position.set(-40, islandTopY, 150);

  const dragon = await dragonModel(scene);
  dragon.position.set(160, islandTopY, 90);

  const table = await tableModel(scene);
  table.position.set(60, islandTopY + 60, 0);
  table.rotation.y = Math.PI / 2;

  const stachCauldron = await stachCauldronModel(scene);
  stachCauldron.position.set(-200, islandTopY, 150);

  const magicCauldron = await magicCauldronModel(scene);
  magicCauldron.position.set(-90, islandTopY, -100);

  const magicVase = await magicVaseModel(scene);
  magicVase.position.set(200, islandTopY + 60, 180);

  const chest = await chestModel(scene);
  chest.position.set(50, islandTopY + 40, -100);

  const bookShelf = await bookShelfModel(scene);
  bookShelf.position.set(0, islandTopY + 130, -250);
  bookShelf.rotation.y = Math.PI;

  const shelf1 = await shelfModel(scene);
  shelf1.position.set(-250, islandTopY, 0);
  shelf1.rotation.y = Math.PI / 2;

  const shelf2 = await shelfModel(scene);
  shelf2.position.set(250, islandTopY, 0);
  shelf2.rotation.y = -Math.PI / 2;

  const city = await floatingCity(scene, camera);
  city.position.set(800, islandTopY - 200, 0);

  const wizardTower = await animatedWizardTower(scene, camera);
  wizardTower.position.set(-900, islandTopY - 300, 0);

  const sky = await skyModel(scene, camera);
  sky.position.set(0, 0, 0);

  const scroll = await scrollModel(scene, camera);
  scroll.position.set(0, islandTopY, 300);

  const scroll2 = await scrollModel(scene, camera);
  scroll2.position.set(300, islandTopY, 300);

  const scroll3 = await scrollModel(scene, camera);
  scroll3.position.set(-300, islandTopY, 300);

  const grass = await grassModel(scene, camera);
  grass.position.set(50, islandTopY, -50);

  const grass2 = await grassModel(scene, camera);
  grass2.position.set(100, islandTopY, 50);

  const grass3 = await grassModel(scene, camera);
  grass3.position.set(-50, islandTopY, 100);

  const grass4 = await grassModel(scene, camera);
  grass4.position.set(-80, islandTopY, 130);

  const grass5 = await grassModel(scene, camera);
  grass5.position.set(-250, islandTopY, 140);
  const ghost = await ghostModel(scene, camera, islandTopY);
  const ghost2 = await ghostModel(scene, camera, islandTopY);

  return {
    wizard,
    dragon,
    table,
    stachCauldron,
    magicCauldron,
    magicVase,
    chest,
    bookShelf,
    shelf1,
    shelf2,
    ghost,
    ghost2,
    city,
    wizardTower,
    sky,
    scroll,
    scroll2,
    scroll3,
    grass,
    grass2,
    grass3,
    grass4,
    grass5,
  };
}
