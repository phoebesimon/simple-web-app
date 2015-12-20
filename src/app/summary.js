/**
 * Sets `counts` to have counts of all tags within a parsed dom object.
 * @param dom Parsed HTML object.
 * @param counts An object.
 */
function createSummaryHelper(dom, counts) {
    dom.forEach(function(obj) {
        if (obj.type === 'tag' || obj.type === 'script') {
            if (!counts.hasOwnProperty(obj.name)) {
                counts[obj.name] = 1;
            } else {
                counts[obj.name]++;
            }
            if (obj.children) {
                createSummaryHelper(obj.children, counts);
            }
        }
    });
}

/**
 * Returns a newly created summary object.
 * @param dom Parsed HTML object.
 * @returns Object An object containing all tags of the dom as keys and their counts as values.
 */
exports.createSummary = function(dom) {
    var summary = {};
    createSummaryHelper(dom, summary);
    return summary;
};