var request = require("supertest");
var should = require("should");
var assert = require("assert");

describe('Get of an unexisting data', ()=>{
    it('should get a 404 status', ()=>{
        request('http://localhost:10000')
            .get('/api/v1/contacts/xxxxxxxxxxxxxxx')
            .send()
            .end((err,res)=>{
                res.status.should.be.equal(404);
            });
    });
});
