function intersectOfArrays (arr1,arr2) 
{
    if(arr1.length > arr2.length) { return intersectOfArrays(arr2,arr1) }

    if( arr1.length > 0.8*arr2.length ) { 
        return directSearchIntersectOfArray(arr1,arr2) 
    } else
    {
        return firstlySortSearchIntersectOfArray(arr1,arr2);
    }


    function directSearchIntersectOfArray (a,b) {
        var intersect = [];

        for(var i = a.length; i--;)
        {
            if(b.indexOf(a[i]) > 0)
            {
                intersect.push(a[i])
            }
        }
        return intersect;
    }


    function firstlySortSearchIntersectOfArray (arr1,arr2) {
        Array.prototype.swap = function (indx1, indx2) {
            var tmp = this[indx1];
            this[indx1] = this[indx2];
            this[indx2] = tmp;
        }
        Array.prototype.binaryIndexOf = function (searchElement) 
        {
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
        }

        function qSort (array, begin, end) 
        {
            function partition (array, begin, end, pivot) {
                var piv = array[pivot];
                array.swap(pivot, end-1);
                var store = begin;
                var ix;
                for(ix = begin; ix<end-1; ++ix) {
                    if(array[ix] <= piv) {
                        array.swap(store, ix);
                        ++store;
                    }
                }
                array.swap(end-1, store);

                return store;
            }

            if(end-1>begin) {
                var pivot = begin + Math.floor(Math.random()*(end-begin));

                pivot = partition(array, begin, end, pivot);

                qSort(array, begin, pivot);
                qSort(array, pivot+1, end);
            }
        }


        var copyArr1 = arr1.slice();
        qSort(copyArr1, 0, arr1.length - 1);
        arr1 = copyArr1;
        var intersect = [];
        for(var i = arr2.length; i--;)
        {
            if(arr1.binaryIndexOf(arr2[i]) > 0) {
                intersect.push(arr2[i])
            }
        }
        return intersect;   
    }
}