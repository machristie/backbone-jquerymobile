
define(['backbone', 'jquery', 'views/HomeView', 'views/Page1View', 'views/Page2View'], 
        function(Backbone, $, HomeView, Page1View, Page2View) {
    var AppRouter = Backbone.Router.extend({

        routes:{
            "":"home",
            "page1":"page1",
            "page2":"page2"
        },

        pages: {
            home: new HomeView(),
            page1: new Page1View(),
            page2: new Page2View()
        },

        initialize:function () {
            // Handle back button throughout the application
            $(document).on('click', '.back', function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
            $(document).on( "pagecontainershow", _.bind(function( event, ui ) {
                // TODO: factor this out into a separate method
                // Figure out what page we are showing and call 'PageView.show' on it
                // TODO: JQM 1.4.3 has ui.toPage, which would be preferred to getActivePage
                var activePage = $( ":mobile-pagecontainer" ).pagecontainer( "getActivePage" );
                _.each(this.pages, function(page) {
                    if( activePage.get(0) === page.el ){
                        page.show(event, ui);
                    }
                });
            }, this));
        },

        home:function () {
            console.log('#home');
            this.changePage(this.pages.home);
        },

        page1:function () {
            console.log('#page1');
            this.changePage(this.pages.page1);
        },

        page2:function () {
            console.log('#page2');
            this.changePage(this.pages.page2);
        },

        changePage:function (page) {
            // Render and add page to DOM once
            if ($('#'+page.id).length === 0) {
                $('body').append(page.render().$el);
            }
            if (this.firstPage) {
                // We turned off $.mobile.autoInitializePage, but now that we've
                // added our first page to the DOM, we can now call initializePage.
                $.mobile.initializePage();
                this.firstPage = false;
            }
            $( ":mobile-pagecontainer" ).pagecontainer( "change", page.$el,
                    { changeHash: false });
        }

    });

    return AppRouter;
});
