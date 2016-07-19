import NotificationsController from './notifications.controller.js';

let notificationsComponent = {
	        bindings: {
	        	notes: '='
	        },
            templateUrl: 'app/components/notifications/notifications.template.html',
            controller: NotificationsController,
            controllerAs: 'noteCtrl'
        };

export default notificationsComponent;