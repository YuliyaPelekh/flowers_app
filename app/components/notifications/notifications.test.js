import NotificationsController from './notifications.controller.js';

describe('noteCtrl', () => {

   let $controller,
   $interval,
   notes = [{text: 'You deleted a flower', date: '20000'}, 
                {text: 'Hello', date: '2222'},
                {text: 'Flower', date: '555'},
                {text: 'Hello', date: '23003'},
                {text: 'Flower', date: '2393'},
                {text: 'Hello', date: '2882'},
                {text: 'Flower', date: '5775'},
                {text: 'Hello', date: '2992'},
                {text: 'Flower', date: '585'},
                {text: 'Flower', date: '595'}
                ];


  beforeEach(inject((_$controller_, _$interval_ ) =>{
        $controller = _$controller_;
        $interval = _$interval_;
  }));


    describe('noteCtrl.deleteNote()', () => {

        it('deletes notification', () => {
          let ctrl = $controller(NotificationsController);
          ctrl.notes = notes;
          localStorage.notes = JSON.stringify(notes);
          ctrl.deleteNote(1);
    	    expect(ctrl.notes.length).toBe(9);
  		});

    });

    describe('noteCtrl.deleteOldNotes', () => {

        it('deletes old notifications every 2 seconds', () => {
          let ctrl = $controller(NotificationsController);
          ctrl.notes = notes;
          localStorage.notes = JSON.stringify(notes);
          $interval.flush(3000);
          ctrl.deleteOldNotes();

          expect(ctrl.notes.length).toBe(8);
      });

        it('deletes old notifications from beginning of array', () => {
          let ctrl = $controller(NotificationsController);
          ctrl.notes = notes;
          localStorage.notes = JSON.stringify(notes);
          $interval.flush(3000);
          ctrl.deleteOldNotes();

          expect(ctrl.notes[0]).toEqual({text: 'Flower', date: '555'});
      });

    });

});


