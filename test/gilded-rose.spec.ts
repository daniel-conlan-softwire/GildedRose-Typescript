import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('Quality degrades by 1 within sell-by date', function() {
        const gildedRose = new GildedRose([ new Item('sandwich', 5, 10) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(9);
    });

    it('Quality degrades twice as fast after sell-by date', function() {
        const gildedRose = new GildedRose([ new Item('sandwich', 0, 10) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(8);
    });

    it('Item quality is never negative', function () {
        const gildedRose = new GildedRose([ new Item('sandwich', 5, 0) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.be.greaterThan(-1);
    });

    it('Item quality is never negative for expired products', function () {
        const gildedRose = new GildedRose([ new Item('sandwich', 0, 0) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.be.greaterThan(-1);
    });

    it('Aged Brie increases in quality the older it gets', function () {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 0) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(1);
    });

    it('Aged Brie increases in quality twice as fast the older it gets past sell-by date', function () {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 0) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(2);
    });

    it('Quality of a non-legendary item is never more than 50', function () {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 50) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(50);
    });

    it('Quality of a non-legendary item is never more than 50 for multiple quality increases', function () {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 50) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(50);
    });

    it('Quality of legendary Sulfuras never decreases', function () {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 0, 80) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(80);
    });

    it('Quality of backstage passes increase by 1 when there are 11 days or more till concert', function () {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 20, 10)
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(11);
        expect(items[1].quality).to.equal(11);
    });

    it('Quality of backstage passes increase by 2 when there are 10 days or less till concert', function () {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10)
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(12);
        expect(items[1].quality).to.equal(12);
    });

    it('Quality of backstage passes increase by 3 when there are 5 days or less till concert', function () {
        const gildedRose = new GildedRose([
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10),
            new Item('Backstage passes to a TAFKAL80ETC concert', 3, 10)
        ]);

        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(13);
        expect(items[1].quality).to.equal(13);
    });

    it('Quality of backstage passes goes to zero once concert passes', function () {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 50) ]);
        const items = gildedRose.updateQuality();

        expect(items[0].quality).to.equal(0);
    });

});
