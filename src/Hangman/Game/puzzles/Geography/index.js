import {Cities} from './cities';

export function Puzzles() {
  this.collection = this.fetch();
}
Puzzles.prototype.fetch = function () {
  return Cities;
};
Puzzles.prototype.getRandom = function () {
  let randomIndex = Math.floor(Math.random() * (this.collection.length - 1));
  return this.collection[randomIndex];
};
