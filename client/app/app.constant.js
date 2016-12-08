(function(angular, undefined) {
  angular.module("weindbApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"auther",
		"admin"
	]
})

;
})(angular);