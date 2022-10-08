"use strict";
//IIFE Immidiately Invoked Function Expression
(function () {
    /**
     *This method saves our data to localStorage
     *
     * @param {any[]} contactList
     */
    function SaveContactListData(contactList) {
        let count = 0;
        for (const contact of contactList) {
            let newContact = new Contact(contact.FullName, contact.ContactNumber, contact.EmailAddress);
            localStorage.setItem(count.toString(), newContact.toJSON());
            count++;
        }
    }
    /**
     *This method reads our data from localStorage and returns a Contact Array
     *
     * @returns  {Contact[]}
     */
    function LoadContactListData() {
        //create an empty Contact Array container
        let ContactArray = new Array();
        let keys = Object.keys(localStorage);
        for (let key of keys) {
            let newContact = new Contact();
            newContact.fromJSON(localStorage.getItem(key));
            ContactArray.push(newContact);
        }
        return ContactArray;
    }
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
    // First method of using functions
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