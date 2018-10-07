//控制层
app.controller('brandController', function($scope, $controller,$http, brandService) {
	$controller('baseController',{$scope:$scope});
	
	$scope.findAll = function() {
		brandService.findAll().success(function(response) {
			$scope.list = response;
		});
	}
	
	/*
	 * //刷新列表 $scope.reloadList = function() {
	 * $scope.findPage($scope.paginationConf.currentPage,
	 * $scope.paginationConf.itemsPerPage); }
	 */
	

	// 分页
	$scope.findPage = function(page, size) {
		brandService.findPage(page, size).success(function(response) {
			$scope.list = response.rows;// 显示当前页数据
			$scope.paginationConf.totalItems = response.total;// 更新总记录数
		});
	}
	// 保存
	$scope.save = function() {
		var object = null;// 方法名称
		if ($scope.entity.id != null) {// 如果有ID
			object = brandService.update($scope.entity);// 则执行修改方法
		} else {
			object = brandService.add($scope.entity);
		}
		object.success(function(response) {
			if (response.success) {
				// 重新查询
				$scope.reloadList();// 重新加载
			} else {
				alert(response.message);
			}
		});
	}

	// 查询实体
	$scope.findOne = function(id) {
		brandService.findOne(id).success(function(response) {
			$scope.entity = response;
		});
	}

	
	// 批量删除
	$scope.dele = function() {
		// 获取选中的复选框
		brandService.dele($scope.selectIds).success(function(response) {
			if (response.success) {
				$scope.reloadList();// 刷新列表
			}
		});
	}

	$scope.searchEntity = {};// 定义搜索对象
	// 条件查询
	$scope.search = function(page, rows) {
		brandService.search(page, rows, $scope.searchEntity).success(
				function(response) {
					$scope.paginationConf.totalItems = response.total;// 总记录数
					$scope.list = response.rows;// 给列表变量赋值
				});
	}

});