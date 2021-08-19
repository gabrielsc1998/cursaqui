// import should from 'should';
import request from 'request';
import chai from 'chai';

import config from '../src/config';

const expect = chai.expect;
const urlBase = `http://localhost:${config.app.port}`;

describe("Teste listagem", () => {

  it("Deve listar tudo", (done) => {
    request.get(
      {
        url : urlBase + "/courses/"
      },
      function(error, response, body) {

        let _body = {};
        try{
          _body = JSON.parse(body);
        }
        catch(e){
          _body = {};
        }

        console.log(_body)
        // utilizando a funcao expect do chai, vamos verificar se o resultado da chamada foi sucesso (200)
        expect(response.statusCode).to.equal(200);

        // // agora, verificamos se retornou a propriedade cards
        // if( _body.should.have.property('cards') ){
        //   //se retornou, vamos verificar o tamanho, deve ser menor ou igual a 100 itens 
        //   expect(_body.cards).to.have.lengthOf.at.most(100);
        // }

        done(); // avisamos o test runner que acabamos a validacao e ja pode proseeguir
      }
    );
  });

  // it("Deve receber a carta 'A Indiferente' ",function(done){
  //   //faremos a chamada com o nome em ingles mesmo, para verificar se eh a carta correta, vamos ver o artista e o nome da carta novamente
  //   request.get(
  //     {
  //       url : urlBase + "/cards?name=Heedless One" 
  //     },
  //     function(error, response, body){

  //       // precisamos converter o retorno para um objeto json
  //       var _body = {};
  //       try{
  //         _body = JSON.parse(body);
  //       }
  //       catch(e){
  //         _body = {};
  //       }

  //       // sucesso (200)?
  //       expect(response.statusCode).to.equal(200);

  //       // agora, verificamos se retornou a propriedade cards
  //       if( _body.should.have.property('cards') ){
  //         //como filtramos, queremos que retorne pelo menos 1, pois existem varias versoes da mesma carta 
  //         expect(_body.cards).to.have.lengthOf.at.least(1);

  //         //faz a verificacao na primeira carta
  //         if(_body.cards[0].should.have.property('artist')){
  //           expect(_body.cards[0].artist).to.equal('Mark Zug');
  //         }
  //         if(_body.cards[0].should.have.property('name')){
  //           expect(_body.cards[0].name).to.equal('Heedless One');
  //         }
  //       }

  //       done(); // avisamos o test runner que acabamos a validação e já pode proseeguir
  //     }
  //   );
  // });
});