describe('Some data is loaded', ()=>{
    it('should show some data in the contact list', ()=>{
        browser.get('http://localhost:10000');
        var contacts = element.all(by.repeater('contact in contactList'));
        expect(contacts.count()).toBeGreaterThan(0);
    });
});