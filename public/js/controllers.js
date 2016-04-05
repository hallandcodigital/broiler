myApp.controller('userController', ['$scope', '$location', 'userModel',
    function($scope, $location, userModel) {
        $scope.userData;
        /*Getting User Profile*/
        userModel.getUser().success(function(response) {
            $scope.userData = response;
        });

        // === Functions === //
        angular.extend($scope, {
            updateUserData: function() {
                userModel.updateUser($scope.userData).success(function(response) {
                    $scope.userData = response;
                });
            }
        });
    }
]);


myApp.controller('settingController', ['$scope', '$location', 'settingModel',
    function($scope, $location, settingModel) {
        $scope.settingDatas;
        $scope.value;
        $scope.key;
        /*Getting all the Settings*/
        settingModel.getSetting().success(function(response) {
            $scope.settingDatas = response;
        });

        // === Functions === //
        angular.extend($scope, {
            updateSettingData: function() {
                settingModel.updateSetting($scope.settingData).success(function(response) {
                    $scope.settingDatas = response;
                });
            },
            createSettingData: function(){
                console.log('in setting controller');
                settingModel.createSetting($scope.key,$scope.value).success(function(response) {
                    console.log('successs');
                    $scope.settingDatas = response;
                });
            }
        });
    }
]);


//# sourceMappingURL=controllers.js.map
