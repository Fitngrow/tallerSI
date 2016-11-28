describe('Add contact', ()=>{
    it('should show add a new contact', ()=>{
        browser.get('http://localhost:10000');


        element.all(by.repeater('contact in contactList')).then((initialContacts)=>{
            element(by.model("newContact.name")).sendKeys("pepe");
            element(by.model("newContact.phone")).sendKeys("123412");
            element(by.model("newContact.email")).sendKeys("pepe@pepe.com");

            element(by.css('[value="add"]')).click();

            element.all(by.repeater('contact in contactList')).then((finalContacts)=>{
                expect(finalContacts.length).toEqual(initialContacts.length+1);
            })
        });




        var contacts = element.all(by.repeater('contact in contactList'));
        expect(contacts.count()).toBeGreaterThan(0);
    });
});