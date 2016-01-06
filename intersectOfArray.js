function intersectOfArrays (arr1, arr2) {
  if ( arr1.length > arr2.length ) { return intersectOfArrays(arr2, arr1) }

  if ( arr1.length > 0.8 * arr2.length ) { 
    return directSearchIntersectOfArray(arr1, arr2) 
  } else {
    return firstlySortSearchIntersectOfArray(arr1, arr2);
  }

  function directSearchIntersectOfArray (arr1, arr2) {
    var intersect = [];

    for (var i = arr1.length; i--;)
    {
      if(~arr2.indexOf(arr1[i]))
      {
        intersect.push(arr1[i])
      }
    }
    return intersect;
  }


  function firstlySortSearchIntersectOfArray (arr1, arr2) {
    Array.prototype.swap = function (indx1, indx2) {
      var tmp = this[indx1];
      this[indx1] = this[indx2];
      this[indx2] = tmp;
    };
      
    Array.prototype.binaryIndexOf = function (searchElement) {
      var minIndex = 0;
      var maxIndex = this.length - 1;
      var currentIndex;
      var currentElement;

      while (minIndex <= maxIndex) 
      {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = this[currentIndex];

        if (currentElement < searchElement) {
          minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
          maxIndex = currentIndex - 1;
        }
        else {
          return currentIndex;
        }
      }

      return -1;
    };
    
    Array.prototype.qSort = function () {
      function qSort (array, beginIndx, endIndx) {
        function partition (array, beginIndx, endIndx, pivot) {
            var pivElement = array[pivot];
            var currentIndx = beginIndx;
            
            array.swap(pivot, (endIndx - 1));
            for (var i = beginIndx; i < (endIndx - 1); ++i) {
              if(array[i] <= pivElement) {
                array.swap(currentIndx, i);
                ++currentIndx;
              }
            }
            array.swap((endIndx - 1), currentIndx);
  
            return currentIndx;
        }
  
        if( (endIndx - 1) > beginIndx ) {
          var pivot = beginIndx + Math.floor(Math.random() * (endIndx - beginIndx));
  
          pivot = partition(array, beginIndx, endIndx, pivot);
  
          qSort(array, beginIndx, pivot);
          qSort(array, pivot+1, endIndx);
        }
      }
      
      qSort(this, 0, (this.length - 1));
    }

      var sortedArr1 = arr1.slice().qSort();
      var intersect = [];

      for(var i = arr2.length; i--;)
      {
          if(sortedArr1.binaryIndexOf(arr2[i]) > 0) {
              intersect.push(arr2[i])
          }
      }
      return intersect; 
  }
}
