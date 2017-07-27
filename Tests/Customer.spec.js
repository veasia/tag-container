const expect = require('chai').expect

const CustomerService = require('../Services/CustomerService.js')
const dbService = require('../Services/dbService.js')
const Customer = require('../Models/Customer.js')

describe('CustomerService module', function () {
  it('GetCustomerNameById', function * () {

    const cid = "1"
    const result_cname = "Ve Interactive"
    
    const executeQueryStub = this.sandbox.stub(dbService, 'executeQuery', function (query, cb) {
      cb({recordset:[{CustomerName:result_cname}]})
    })

    const result = yield CustomerService.getCustomerNameById(cid)

    expect(executeQueryStub).to.be.calledWith()
    expect(result).to.eql(new Customer(cid,result_cname));
  })

  it('GetCustomerNameById, id=null', function * () {

    const cid = null
    const result_cname = "Ve Interactive"
    
    const executeQueryStub = this.sandbox.stub(dbService, 'executeQuery', function (query, cb) {
      cb({recordset:[{CustomerName:result_cname}]})
    })

    CustomerService.getCustomerNameById(cid).then(
      ()=>{
        should.fail();
        done();
      },
      (error) => {
        expect(error).to.not.be.null;
        expect(error).to.not.be.undefined;
        expect(error.message).to.equal({status: "failed"});
        done();
      }
    )

  })
})