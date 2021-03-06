'use strict';
myApp.controller('listStaticpageController', listStaticpageControllerFnc);

function listStaticpageControllerFnc($scope, $location, $compile, DTOptionsBuilder, DTColumnBuilder, staticpageModel, Flash) {
    $scope.deleteID;
    $scope.deleteStaticPageData;
    $scope.openDeleteModal = openDeleteModal;
    $scope.msg;
    $scope.msgType;
    $scope.msgShow;

    staticpageModel.getStaticpageList().success(function(response) {
        if (response.accessDenied == 'true') {
            $location.path('/dashboard');
            Flash.create(response.msgType, response.msg);
        }
    });

    $scope.dtOptions = DTOptionsBuilder.fromSource(baseUrl + 'portal/staticpage')
        .withPaginationType('full_numbers').withOption('createdRow', createdRow)
        .withOption('responsive', true).withBootstrap();
    $scope.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('title').withTitle('Title'),
        DTColumnBuilder.newColumn('slug').withTitle('Slug'),
        DTColumnBuilder.newColumn('sortid').withTitle('Sort #'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml).withClass('text-center btn-group-sm'),
        DTColumnBuilder.newColumn('content').withTitle('Content').withClass('none')
    ];
    $scope.dtInstance = {};
    $scope.deleteStaticpage = function(id){
        staticpageModel.deleteStaticpage(id).success(function(response) {
            $('#staticPageDatatable').DataTable().ajax.reload();//This part is stupid
            $('#staticpageDeleteModal').modal('hide');
            $scope.deleteStaticPageData = response.staticpagesData;
            $scope.msg = response.msg;
            Flash.create(response.msgType, response.msg);
        });
    }


    function openDeleteModal(id) {
        staticpageModel.getStaticpage(id).success(function(response) {
            $scope.deleteID = id;
            $scope.deleteStaticPageData = response;
        });
    }
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    function actionsHtml(data, type, full, meta) {
            return '<a class="btn btn-primary btn-fab" href="#/staticpage/'+data.id+'"><i class="material-icons md-24">mode_edit</i></a>&nbsp;' +
            '<button class="btn btn-danger btn-fab" data-toggle="modal" data-target="#staticpageDeleteModal" ng-click="openDeleteModal('+data.id+')">' +
            '   <i class="material-icons md-24">delete</i>' +
            '</button>';
    }
}

myApp.controller('singleStaticpageController', ['$scope', '$routeParams','$location','staticpageModel', 'Flash',
  function($scope, $routeParams, $location, staticpageModel, Flash) {
    $scope.pageid = $routeParams.id;
    $scope.staticpageData;
    staticpageModel.getStaticpage($scope.pageid).success(function(response) {
        if (response.accessDenied == 'true') {
            $location.path('/dashboard');
            Flash.create(response.msgType, response.msg);
        }
        $scope.staticpageData = response;
    });

    // === Functions === //
    angular.extend($scope, {
        updateStaticpageData: function() {
            staticpageModel.updateStaticpage($scope.staticpageData).success(function(response) {
                $scope.staticpageData = response.staticpageData;
                Flash.create(response.msgType, response.msg);
            });
        },
        deleteStaticpage: function(id){
            staticpageModel.deleteStaticpage(id).success(function(response) {
                $('.modal-backdrop').hide();
                $location.path( "/staticpage" );
                Flash.create(response.msgType, response.msg);
            });
        }
    });
}]);

myApp.controller('createStaticpageController', ['$scope', '$routeParams','$location','staticpageModel','Flash',
  function($scope, $routeParams, $location, staticpageModel,Flash) {
    $scope.staticpageData = {'id':'','title':'','slug':'','sortid':'','content':''};
    // === Functions === //
    angular.extend($scope, {
        createStaticpageData: function(){
            if ($scope.createStaticPageForm.$valid) {
                staticpageModel.createStaticpage($scope.staticpageData).success(function(response) {
                    $location.path('/staticpage/'+response.staticpageData.id);
                    Flash.create(response.msgType, response.msg);
                });
            }
        }
    });
}]);
