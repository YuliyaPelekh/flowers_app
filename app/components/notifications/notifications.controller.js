class NotificationsController{

	constructor ($interval){
      this.$interval = $interval;
      this.deleteOldNotes();
	}

	deleteOldNotes(){
		let remove = () => {
			while (this.notes.length > 8){
               this.notes.shift();
               let notes = JSON.parse(localStorage.notes);
        	     notes.shift();
               localStorage.notes = JSON.stringify(notes);
		   }
		};

		this.$interval(remove, 2000);
	}

	deleteNote(index){
        this.notes.splice(index, 1);
        //remove from localStorage
        let notes = JSON.parse(localStorage.notes);
            notes.splice(index,1);
            localStorage.notes = JSON.stringify(notes);
    }
};

NotificationsController.$inject = ['$interval'];

export default NotificationsController;