/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through allFeeds array checking that each feed has
         * a defined url which is not empty
         */
        it('have a URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect((feed.url).length).not.toBe(0);
            });
        });

        /* Loop through allFeeds array checking that each feed has
         * a defined name which is not empty
         */
        it('have a name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect((feed.name).length).not.toBe(0);
            });
        });
    });


    describe('The menu', function() {
        let body;

        beforeEach(function() {
            body = document.querySelector('body');
        });

        /* Test is menu is hidden by default by checking that the body
         * containes the menu-hidden class
         */
        it('is hidden by default', function() {
            expect(body.classList).toContain('menu-hidden');
        });
         /* Test functionality of hamburger icon. First click makes menu
          * visible, second click hides the menu.
          */
        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect(body.classList).not.toContain('menu-hidden');

            $('.menu-icon-link').click();
            expect(body.classList).toContain('menu-hidden');
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done()
            });
        });

        /* Check the feed entry after loading feeds to ensure that entries
        * have been loaded
         */
        it('loads a single entry into the feed container', function() {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {
        let initialFeed,
            newFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = $('.feed').html();
                loadFeed(1, function() {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });


        /* Test that feed actually changes when loading a different
         * feed source.
         */
        it('changes content when a new feed is loaded', function() {

            expect(newFeed).not.toBe(initialFeed);
        });
    });
}());
