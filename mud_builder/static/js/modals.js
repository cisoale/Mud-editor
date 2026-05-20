// ========================================
// MODALS
// ========================================


// ========================================
// CLOSE MAIN MODAL
// ========================================

function closeModal() {

    document.getElementById(
        'modalOverlay'
    ).style.display = 'none'

    document.getElementById(
        'roomEditor'
    ).style.display = 'none'

    document.getElementById(
        'mobEditor'
    ).style.display = 'none'
}


// ========================================
// HELP
// ========================================

function openHelpModal() {

    document.getElementById(
        'helpOverlay'
    ).style.display = 'flex'
}


function closeHelpModal() {

    document.getElementById(
        'helpOverlay'
    ).style.display = 'none'
}


// ========================================
// VALIDATION
// ========================================

function openValidationModal() {

    document.getElementById(
        'validationOverlay'
    ).style.display = 'flex'
}


function closeValidationModal() {

    document.getElementById(
        'validationOverlay'
    ).style.display = 'none'
}