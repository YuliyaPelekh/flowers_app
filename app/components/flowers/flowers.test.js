import FlowersController from './flowers.controller.js';

describe('flCtrl', () => {

   let $controller,
   $interval,
   notes = [{text: 'You deleted a flower', date: '20000'}, 
                {text: 'Hello', date: '2222'},
                {text: 'Flower', date: '555'},
            ],
    flowers =[{startDate: '1468846251197'},
                {startDate: '1468846252000'}];



    beforeEach(inject((_$controller_, _$interval_ ) =>{
        $controller = _$controller_;
        $interval = _$interval_;
    }));


    beforeEach(() => {

        spyOn(localStorage, 'getItem').and.callFake((key) => {
            return JSON.stringify(notes);
        });

        spyOn(localStorage, 'setItem').and.callFake((key, value) =>{
            notes = JSON.parse(value);
        });

    });


    describe('flCtrl.addFlower()', () => {

        it('increases flowers by one', () => {
          let ctrl = $controller(FlowersController);
          ctrl.flowers = flowers;
          localStorage.flowers = JSON.stringify(flowers);
          ctrl.addFlower();
          expect(ctrl.flowers.length).toBe(3);
        });

        it('calls notifyOnWater method', () => {
          let ctrl = $controller(FlowersController);
          ctrl.flowers = flowers;
          localStorage.flowers = JSON.stringify(flowers);
          spyOn(ctrl, 'notifyOnWater');
          ctrl.addFlower();
          expect(ctrl.notifyOnWater).toHaveBeenCalled();
        });

    });

     describe('flCtrl.addNote()', () => {

        it('adds a note with certain text', () => {
          let ctrl = $controller(FlowersController);
          ctrl.notes = notes;
          localStorage.notes = JSON.stringify(notes);
          ctrl.addNote("My Flowers");
          let lastIndex = ctrl.notes.length - 1;
          expect(ctrl.notes[lastIndex].text).toBe("My Flowers");
        });

    });


     describe('flCtrl.deleteFlower()', () => {

        it('deletes a flower', () => {
          let ctrl = $controller(FlowersController);
          ctrl.flowers = flowers;
          localStorage.flowers = JSON.stringify(flowers);
          let length = flowers.length;
          ctrl.deleteFlower(1);
          expect(flowers.length).toBe(length - 1);
        });

    });

    describe('flCtrl.waterFlower()', () => {

        it('changes the flower startDate', () => {
          let ctrl = $controller(FlowersController);
          ctrl.flowers = flowers;
          localStorage.flowers = JSON.stringify(flowers);
          let oldStartDate = flowers[0].startDate;
          ctrl.waterFlower(0);
          expect(flowers[0].startDate).not.toBe(oldStartDate);
        });

         it('gives notification on watering', () => {
          let ctrl = $controller(FlowersController);
          ctrl.flowers = flowers;
          ctrl.notes = notes;
          localStorage.flowers = JSON.stringify(flowers);
          ctrl.waterFlower(0);
          let len = ctrl.notes.length - 1;
          expect(ctrl.notes[len].text).toBe("Flower no. 1 was watered");
        });

    });

});