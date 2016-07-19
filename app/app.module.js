import flowersComponent from './components/flowers/flowers.component.js';
import notificationsComponent from './components/notifications/notifications.component.js';

angular.module('app', [])
					.component('flowersComponent', flowersComponent)
					.component('notificationsComponent', notificationsComponent);