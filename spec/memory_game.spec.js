describe('Memory game', function () {

   const jsdom = require('jsdom'),
         html  = require('./html'),
         main  = require('../src/script');

   beforeEach(() => {
      dom = new jsdom.JSDOM(html);
      document = dom.window.document;
   });

   const onClick = btn => {
      btn.addEventListener('startGame', e => {
         main.startGame();
      });

      const e = new dom.window.Event("startGame");

      btn.dispatchEvent(e);
   }

   it('Should change start display style to none', function () {

      const btn = document.getElementById('btn');

      onClick(btn);
      
      expect(btn.style.display).toBe('none');
   });

   

});