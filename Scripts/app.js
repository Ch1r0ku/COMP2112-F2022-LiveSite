"use strict";
//IIFE Immidiately Invoked Function Expression
(function () {
    /**
     *
     * This method loads header
     *
     */
    function LoadHeader() {
        console.log("loading header...");
        $.get("/Views/components/header.html", function (html_data) {
            $("header").html(html_data);
            //activate the current link
            $("li>a#Home").addClass("active");
            $("li>a").on("click", function (event) {
                event.preventDefault();
                //change title
                document.title = $(this).prop("id");
                //change url
                history.pushState({}, "", "/" + document.title);
                //remove the active class
                $("li>a").each(function () {
                    $(this).removeClass("active");
                });
                //activate the current link
                $("li>a#" + document.title).addClass("active");
                LoadContent();
            });
        });
    }
    /**
     *
     * This methods injects content
     *
     */
    function LoadContent() {
        console.log("loading content...");
        let contentLink = document.title.toLowerCase();
        $.get("/Views/content/" + contentLink + ".html", function (html_data) {
            $("main").html(html_data);
            $("li>a").on("click", function (event) {
                event.preventDefault();
                document.title = $(this).prop("id");
                history.pushState({}, "", "/" + document.title);
                LoadContent();
            });
        });
    }
    /**
     *
     * This method loads footer
     *
     */
    function LoadFooter() {
        console.log("loading footer...");
        $.get("/Views/components/footer.html", function (html_data) {
            //vanilla javascript
            //document.getElementsByTagName("footer")[0].innerHTML = html_data;
            //jquery
            $("footer").html(html_data);
        });
    }
    // Start function
    function Start() {
        console.log("App Started!");
        //initial title
        document.title = "Home";
        //change url
        history.pushState({}, "", "/Home");
        LoadContent();
        LoadHeader();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map