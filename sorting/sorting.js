/*
 * Sorting algorithms in JS
 */

'use strict';

function dsSorting() {
    this.globalCounter = 0;

    /*
     * Bubble sort
     */

    this.bubbleSort = function(arr, order) {
        var order = order || 'asc';
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
        var order = order || 'asc';

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
        var order = order || 'asc';

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
        var orde = order || 'asc';
        var minIdx = minIdx || 0;
        var maxIdx = maxIdx || arr.length - 1;
        var pivotIdx = Math.ceil((minIdx + maxIdx) / 2);


    };


    /*
     * Merge sort
     */

    this.mergeSort = function(arr, order, startIdx, endIdx) {
        var order = order || 'asc';
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

        for (var l = startIdx; l <= mid; l++)
            lArr.push(arr[l]);

        for (var r = mid + 1; r <= endIdx; r++)
            rArr.push(arr[r]);

        var li = 0;
        var ri = 0;
        var tempArr = [];
        var tempArrIdx = 0;

        while (li < lArr.length && ri < rArr.length) {
            if (lArr[li] < rArr[ri]) {
                (order === 'asc') ? (tempArr[tempArrIdx] = lArr[li], li++) : (tempArr[tempArrIdx] = rArr[ri], ri++);
            } else {
                (order === 'asc') ? (tempArr[tempArrIdx] = rArr[ri], ri++) : (tempArr[tempArrIdx] = lArr[li], li++);
            }

            tempArrIdx++;
        }

        for (var l = li; l < lArr.length; l++)
            tempArr.push(lArr[l]);

        for (var r = ri; r < rArr.length; r++)
            tempArr.push(rArr[r]);

        for (var x = startIdx, i = 0; x <= endIdx; x++, i++)
            arr[x] = tempArr[i];

        return arr;
    };


    /*
     * Shell sort
     */

    this.shellSort = function() {};


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