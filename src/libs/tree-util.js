import _ from 'lodash';

let treeUtil = {

};

treeUtil.filterTreeObj = function( treeObj, filter ,doThings) {
    let newArr = new Array();
    treeObj.forEach( (item) => {
        if(filter(item)){
            //新复制一个对象而非只是引用
            let newItem = JSON.parse(JSON.stringify(item));
            if(item.children && item.children.length > 0){
                newItem.children = treeUtil.filterTreeObj(item.children , filter, doThings);
            }
            newArr.push( doThings(newItem) );
        }
    });
    return newArr;
};

treeUtil.copyTreeObjWithGivenProp = function( treeObj, properties) {
    let newArr = new Array();
    treeObj.forEach( (item) => {
        let node = {};
        properties.forEach((v) => {
            node[v] = item[v];
        });

        if(item.children && item.children.length > 0){
            node.children = treeUtil.copyTreeObjWithGivenProp(item.children , properties);
        }
        newArr.push( node );
    });
    return newArr;
};


treeUtil.getAllEndNodes = function( treeObj, newArr, doThings){
    treeObj.forEach( (item) => {
        if(item.children && item.children.length > 0){
            treeUtil.getAllEndNodes(item.children , newArr, doThings);
        }else{
            newArr.push( doThings(item) );
        }
    });
    return newArr;
};

treeUtil.getAllEndNodes2Map = function( treeObj, newObj, doThings){
    treeObj.forEach( (item) => {
        if(item.children && item.children.length > 0){
            treeUtil.getAllEndNodes2Map(item.children , newObj, doThings);
        }else{
            newObj[doThings(item)] = true ;
        }
    });
    return newObj;
};

treeUtil.filterAllNodes2Map = function( treeObj, newObj, property, filter){
    treeObj.forEach( (item) => {
        if(item.children && item.children.length > 0){
            treeUtil.filterAllNodes2Map(item.children , newObj,  property, filter);
        }
        newObj[item[property]] = filter(item) ;
    });
    return newObj;
};

// pid 为list中的父id的属性名
// id 为list中的id的属性名
treeUtil.list2Tree = function (list, pid, id) {
    let queue = treeUtil.findRootId(list, pid, id);

    let treeObj = {
        children: []
    };
    _.each(queue, item => {
        treeObj.children.push(item);
    });

    while (queue.length > 0) {
        var pObj = queue.shift();
        pObj.children = [];
        list.forEach(it => {
            if (it[pid] == pObj[id]) {
                queue.push(it);
                pObj.children.push(it);
            }
        });
    }

    return treeObj;
};

/**
 * 返回所有根的集合
 *
 * @param data  数组形式，[{pid:xx,id:xxx,...},{pid:xx,id:xxx,...}]
 * @param pid   数组元素中pid的别名
 * @param id    数组元素中id的别名
 */
treeUtil.findRootId = function(data , pid , id) {
    var ids = _.union(_.map(data,item => { return item[id] }));
    var pids = _.union(_.map(data,item => { return item[pid] }));

    var ar = _.difference(pids, ids)
    return _.filter(data, function(it){ return _.includes(ar, it[pid]); });
}




export default treeUtil;