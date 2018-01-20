
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URL', function() {

          allFeeds.forEach(function(feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url.length).not.toBe(0);
          });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('have name', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           });
         });
    });

    describe('The menu', function() {
      var user;
      // var menuButton;

      beforeEach(function() {
        user = new User();
      });

      /*  A test that ensures the menu element is
       * hidden by default.
       */

      it('is hidden', function() {
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });

      /* A test that ensures the menu changes
       * visibility when the menu icon is clicked.
       */

      it('changes visibility when icon clicked', function() {
        user.click($('.menu-icon-link'));
        expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
        user.click($('.menu-icon-link'));
        expect($('body').hasClass('menu-hidden')).toBeTruthy();
      });

    });

    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, function() {
          done();
        });
      });
      it('are loaded', function(done) {
        expect($('.feed .entry').length).not.toBe(0);
        done();
      });

    });

    /* A test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
      describe('New Feed Selection', function() {
        var initialFeed;
        var secondFeed;
        beforeEach(function(done) {
          loadFeed(0,
            function() {
              initialFeed = $('.feed').html();
              loadFeed(1, function() {
              secondFeed = $('.feed').html();
              done();
            });
            }
          );

        });
        it('is loaded and added to content', function() {
          expect(initialFeed).not.toEqual(secondFeed);
        });
      });
}());
