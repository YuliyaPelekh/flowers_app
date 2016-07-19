class FlowersController{

	constructor ($interval){
	 	  this.notes = JSON.parse(localStorage.getItem('notes'));
      this.flowers = JSON.parse(localStorage.getItem('flowers'));
      this.$interval = $interval;
      this.notifyOnWater();
	} 
 
   addFlower(){
      this.flower ={
         startDate: Date.now()
      } 
   	  this.flowers.push(this.flower);
      localStorage.setItem('flowers', JSON.stringify(this.flowers));
      this.notifyOnWater();
   }

   addNote(note){
      this.note ={
         text: note,
         date: Date.now()
      } 
      this.notes.push(this.note);
      localStorage.setItem('notes', JSON.stringify(this.notes));
   }

   deleteFlower(index){
        //cancel notifications
        this.$interval.cancel(this.flowers[index].interval);
        this.flowers.splice(index, 1);
        //remove from localStorage
        let fls = JSON.parse(localStorage.flowers);
        fls.splice(index,1);
        localStorage.flowers = JSON.stringify(fls);
   }

   waterFlower(index){
      this.flowers[index].startDate = Date.now();
      //save changes in localStorage
      let fls = JSON.parse(localStorage.flowers);
      fls[index].startDate = Date.now();
      localStorage.setItem('flowers', JSON.stringify(this.flowers));
      //give notification
      this.addNote(`Flower no. ${index + 1} was watered`);
   }


   notifyOnWater(){
      this.flowers.forEach((fl, index) =>{
         let notify = ()=>{
            let timePassed = Date.now() - fl.startDate;
            if (timePassed >= 300000){
               this.addNote(`Please water flower no. ${index + 1}`);               
            } 
         }

        fl.interval = this.$interval(notify, 30000) 
      });     
   }
};

FlowersController.$inject = ['$interval'];

export default FlowersController;
