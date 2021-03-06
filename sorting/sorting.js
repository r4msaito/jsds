/*
 * Sorting algorithms in JS
 */

'use strict';

function dsSorting() {
    this.acceptedSortingOrders = ['asc', 'desc'];

    /*
     * Bubble sort
     */

    this.bubbleSort = function(arr, order) {
        var order = (this.acceptedSortingOrders.indexOf(order) !== -1) ? order : 'asc';
        var swapped = false;
        var thisClass = this;

        if (arr.length <= 1)
            return arr;

        do {
            swapped = false;
            arr.forEach(function(element, idx) {
                if (arr.length === (idx + 1))
                    return;

                if (order === 'asc') {
                    if (arr[idx] > arr[idx + 1]) {
                        thisClass.swap(arr, idx, idx + 1);
                        swapped = true;
                    }
                } else if (order === 'desc') {
                    if (arr[idx] < arr[idx + 1]) {
                        thisClass.swap(arr, idx, idx + 1);
                        swapped = true;
                    }
                }
            });
        } while (swapped);

        return arr;
    };


    /*
     * Selection sort
     */

    this.selectionSort = function(arr, order) {
        var order = (this.acceptedSortingOrders.indexOf(order) !== -1) ? order : 'asc';

        if (arr.length <= 1)
            return arr;

        var requireSwap = false;
        var i = 0;

        for (i = 0; i < arr.length - 1; i++) {
            var sIdx = i;
            for (var j = i; j < arr.length; j++) {
                if (order === 'asc') {
                    if (arr[j] < arr[sIdx]) {
                        sIdx = j;
                        requireSwap = true;
                    }
                } else if (order === 'desc') {
                    if (arr[j] > arr[sIdx]) {
                        sIdx = j;
                        requireSwap = true;
                    }
                }
            }

            if (requireSwap)
                this.swap(arr, i, sIdx);
        }

        return arr;
    };


    /*
     * Insertion sort
     */

    this.insertionSort = function(arr, order) {
        var order = (this.acceptedSortingOrders.indexOf(order) !== -1) ? order : 'asc';

        if (arr.length <= 0)
            return arr;

        for (var i = 1; i < arr.length; i++) {
            for (var j = i - 1; j >= 0; j--) {
                if (order === 'asc') {
                    while (arr[j] > arr[j + 1])
                        this.swap(arr, j, j + 1);
                } else if (order === 'desc') {
                    while (arr[j] < arr[j + 1])
                        this.swap(arr, j, j + 1);
                }
            }
        }

        return arr;
    }


    /*
     * Quick sort
     */

    this.quickSort = function(arr, order, minIdx, maxIdx) {
        var order = (this.acceptedSortingOrders.indexOf(order) !== -1) ? order : 'asc';
        var minIdx = (typeof minIdx === 'undefined') ? 0 : minIdx;
        var maxIdx = (typeof maxIdx === 'undefined') ? arr.length - 1 : maxIdx;
        var pivotIdx = maxIdx;
        var newPivotIdx = pivotIdx;
        var rp = pivotIdx - 1;
        var lp = minIdx;

        if (minIdx >= maxIdx)
            return;

        while (lp !== rp) {
            if (order === 'asc') {
                if (arr[lp] > arr[pivotIdx]) {
                    (arr[rp] < arr[pivotIdx]) ? (this.swap(arr, rp, lp), lp++) : rp--;
                } else {
                    lp++;
                }
            } else if (order === 'desc') {
                if (arr[lp] < arr[pivotIdx]) {
                    (arr[rp] > arr[pivotIdx]) ? (this.swap(arr, rp, lp), lp++) : rp--;
                } else {
                    lp++;
                }
            }

        }

        if (lp === rp) {
            if (order === 'asc' && arr[lp] > arr[pivotIdx]) {
                this.swap(arr, lp, pivotIdx);
                newPivotIdx = lp;
            } else if (order === 'desc' && arr[lp] < arr[pivotIdx]) {
                this.swap(arr, lp, pivotIdx);
                newPivotIdx = lp;
            }

        }

        this.quickSort(arr, order, minIdx, newPivotIdx - 1);
        this.quickSort(arr, order, newPivotIdx + 1, maxIdx)

        return arr;
    };


    /*
     * Merge sort
     */

    this.mergeSort = function(arr, order, startIdx, endIdx) {
        var order = (this.acceptedSortingOrders.indexOf(order) !== -1) ? order : 'asc';
        var startIdx = (typeof startIdx !== 'undefined') ? startIdx : 0;
        var endIdx = (typeof endIdx !== 'undefined') ? endIdx : arr.length - 1;

        if (startIdx >= endIdx)
            return;

        var mid = Math.floor((startIdx + (endIdx - 1)) / 2);
        this.mergeSort(arr, order, startIdx, mid);
        this.mergeSort(arr, order, mid + 1, endIdx);

        //Let the sorting begin
        var lArr = [];
        var rArr = [];
        var lp = 0;
        var rp = 0;
        var tempArr = [];
        var tempArrIdx = 0;

        for (var l = startIdx; l <= mid; l++)
            lArr.push(arr[l]);

        for (var r = mid + 1; r <= endIdx; r++)
            rArr.push(arr[r]);

        while (lp < lArr.length && rp < rArr.length) {
            if (lArr[lp] < rArr[rp]) {
                (order === 'asc') ? (tempArr[tempArrIdx] = lArr[lp], lp++) : (tempArr[tempArrIdx] = rArr[rp], rp++);
            } else {
                (order === 'asc') ? (tempArr[tempArrIdx] = rArr[rp], rp++) : (tempArr[tempArrIdx] = lArr[lp], lp++);
            }

            tempArrIdx++;
        }

        for (var l = lp; l < lArr.length; l++)
            tempArr.push(lArr[l]);

        for (var r = rp; r < rArr.length; r++)
            tempArr.push(rArr[r]);

        for (var x = startIdx, i = 0; x <= endIdx; x++, i++)
            arr[x] = tempArr[i];

        return arr;
    };


    /*
     * Shell sort
     */

    this.shellSort = function(arr, order) {
        var order = (this.acceptedSortingOrders.indexOf(order) !== -1) ? order : 'asc';
        var interval = 4; //Harcoded interval

        for (var i = 0; i <= arr.length - 1; i = i + (interval - 1)) {
            var nxtInterval = i + (interval - 1);
            if (interval === 1)
                return this.insertionSort(arr, order);

            if (typeof arr[nxtInterval] === 'undefined')
                continue;

            if (arr[i] < arr[nxtInterval])
                this.swap(arr, i, nxtInterval);

            interval = Math.floor(interval / 2);
        }

        return arr;
    };


    /*
     * Swap the values in two array indexes
     */

    this.swap = function(arr, sIdx, dIdx) {
        var temp = arr[sIdx];
        arr[sIdx] = arr[dIdx];
        arr[dIdx] = temp;
        return arr;
    };
}