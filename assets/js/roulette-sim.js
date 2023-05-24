// require('roulette-constants.js')

let currentSelectedChipIndex = CHIP_AMOUNT_INDEX_5; // Default to the $5 chip
let currentWheelType = WHEEL_TYPE_0;                // Single Zero
let wagers = {};
let equityPerSpot = {};
let chipBuffer = [];

function toggleWheelType() {
    if (currentWheelType === WHEEL_TYPE_0) {
        setWheelType(WHEEL_TYPE_00);
    }
    else {
        setWheelType(WHEEL_TYPE_0);
    }
}

function toggleTextArea() {
    if ($('#configurationDiv').hasClass('configuration-hidden')) {
        $('#configurationDiv').removeClass('configuration-hidden');
    }
    else {
        $('#configurationDiv').addClass('configuration-hidden');
    }
}

function addHotSpot(identifier, isGreen, left, top, className) {
    let newDiv = document.createElement('div');

    newDiv.id = identifier;
    newDiv.classList.add('hotspot');
    newDiv.classList.add(className);

    newDiv.classList.add(isGreen ? 'hotspot-g' : 'hotspot-r');
    newDiv.style.left = left + 'px';
    newDiv.style.top = top + 'px';
    newDiv.onmouseover = function() { onSpotHover(newDiv) };
    newDiv.onmouseout = function() { onSpotHoverEnd(newDiv) };
    newDiv.onclick = function() { onSpotClick(newDiv) };

    if (identifier === 'x1-00') {
        newDiv.classList.add('spot-hidden');
    }

    $('#mainDiv').append(newDiv);
}

function addBettingChip(elementId, chipIndex) {
    // TODO: Move this to a separate function
    let newDiv = document.createElement('div');
    let newImg = document.createElement('img');
    let newTextDiv = document.createElement('div');
    let elementSelector = '#' + elementId;

    newDiv.id = 'chip-' + elementId;
    newDiv.classList.add('chip');
    newDiv.classList.add('chip-bet');

    let divWidth = $(elementSelector).width();
    let divHeight = $(elementSelector).height();
    let divLeft = $(elementSelector).position().left;
    let divTop = $(elementSelector).position().top;

    newDiv.style.left = divLeft + (divWidth / 2) - (CHIP_WIDTH / 2);
    newDiv.style.top = divTop + (divHeight / 2) - (CHIP_HEIGHT / 2);

    newImg.id = 'chip-img-' + elementId;
    newImg.width = CHIP_WIDTH;
    newImg.height = CHIP_HEIGHT;

    newTextDiv.classList.add('chip-text');
    newTextDiv.innerHTML = CHIP_AMOUNTS[chipIndex];

    $('#mainDiv').append(newDiv);
    $('#' + newDiv.id ).append(newImg);
    $('#' + newDiv.id ).append(newTextDiv);
}

function addEquitySpot(spot, left, top) {
    let newDiv = document.createElement('div');
    let innerDiv = document.createElement('div');
    let identifier = 'equity-' + spot;

    let spotIsRed = isRed(spot);
    let spotIsBlack = isBlack(spot);

    newDiv.id = identifier;
    newDiv.classList.add('equity');
    
    if (spotIsRed) {
        newDiv.classList.add('spot-red');
    }
    else if (spotIsBlack) {
        newDiv.classList.add('spot-black');
    }
    else {
        newDiv.classList.add('spot-green');
        if (spot === '00') {
            newDiv.classList.add('equity-00');
            newDiv.classList.add('equity-hidden');
        }
        else {
            newDiv.classList.add('equity-0');
        }
    }

    newDiv.style.left = left + 'px';
    newDiv.style.top = top + 'px';

    $('#mainDiv').append(newDiv);
    $('#equity-' + spot).append(innerDiv);
}

function addWinLossSpot(spot, left, top) {
    let newDiv = document.createElement('div');
    let innerDiv = document.createElement('div');
    let identifier = 'win-' + spot;

    let spotIsRed = isRed(spot + '');
    let spotIsBlack = isBlack(spot + '');

    newDiv.id = identifier;
    newDiv.classList.add('win');
    
    if (spotIsRed) {
        newDiv.classList.add('spot-red');
    }
    else if (spotIsBlack) {
        newDiv.classList.add('spot-black');
    }
    else {
        newDiv.classList.add('spot-green');
        if (spot === '00') {
            newDiv.classList.add('win-00');
            newDiv.classList.add('win-hidden');
        }
        else {
            newDiv.classList.add('win-0');
        }
    }

    newDiv.style.left = left + 'px';
    newDiv.style.top = top + 'px';

    $('#mainDiv').append(newDiv);
    $('#win-' + spot).append(innerDiv);
}

function addSpotHighlight(spot, left, top) {
    let newDiv = document.createElement('div');
    let identifier = 'highlight-' + spot;

    newDiv.id = identifier;
    newDiv.classList.add('highlight');
    newDiv.classList.add('highlight-hidden');
    
    if (spot === '0') {
        newDiv.classList.add('highlight-0-0');
    }
    else if (spot === '00') {
        newDiv.classList.add('highlight-00-00');
    }

    newDiv.style.left = left + 'px';
    newDiv.style.top = top + 'px';

    $('#mainDiv').append(newDiv);
}

function isGreen(spot) {
    spot = spot.toString();
    return ROULETTE_NUMBERS_GREEN.includes(spot);
}

function isRed(spot) {
    spot = spot.toString();
    return ROULETTE_NUMBERS_RED.includes(spot);
}

function isBlack(spot) {
    spot = spot.toString();
    return ROULETTE_NUMBERS_BLACK.includes(spot);
}

function is00Only(identifier) {
    return HOTSPOTS_00_ONLY.includes(identifier);
}

function onSpotHover(element) {
    //console.log('Hover over [' + element.id + ']');
    $('#betInfoDiv').removeClass('bet-info-hidden');
    updateBetInfoUI(element.id);
}

function onSpotHoverEnd(element) {
    $('#betInfoDiv').addClass('bet-info-hidden');
    clearBetInfoUI();
}

function updateBetInfoUI(elementId) {
    if (!elementId) {
        return;
    }

    let bet = getBetInfo(elementId);
    $('#betInfoBetHeaderDiv').text(bet.canonicalName);
    $('#betInfoBetPaysDiv').text('Pays: ' + bet.payout + ':1');

    var currentBet = wagers[elementId];
    if (currentBet) {
        $('#betInfoBetCurrentBetDiv').text('Bet: ' + (currentBet).toLocaleString());
        $('#betInfoBetWinningPayDiv').text('Payout: ' + (bet.payout * currentBet).toLocaleString());
    }

    bet.numbersCovered.forEach(spot => {
        //console.log('highlighting ' + spot);
        $('#highlight-' + spot).removeClass('highlight-hidden');
        if (currentWheelType === WHEEL_TYPE_0) {
            if (spot === '0') {
                $('#cap-0-0').removeClass('highlight-hidden');
            }
        }
        else {
            if (spot === '0') {
                $('#cap-00-0').removeClass('highlight-hidden');
            }
            else if (spot === '00') {
                $('#cap-00-00').removeClass('highlight-hidden');
            }
        }
    });
}

function updateTotalAmounts() {
    let totalBetAmount = 0;
    for (const key in wagers) {
        totalBetAmount += wagers[key];
    }
    
    if (totalBetAmount > 0) {
        $('#totalBetAmountDiv').text(totalBetAmount.toLocaleString());
        if (currentWheelType === WHEEL_TYPE_0) {
            // Single Zero wheel - 2.7%
            $('#evDiv').text((-totalBetAmount / 37.0).toLocaleString());
        }
        else {
            // Double Zero wheel - 5.26%
            // TODO Check for topline bet
            if (wagers['x5-topline'] > 0) {
                let topLineBet = wagers['x5-topline'];
                let totalBetWithoutTopLine = totalBetAmount - topLineBet;
                let totalEv = -(totalBetWithoutTopLine / 19.0) - (topLineBet * 0.0789);
                $('#evDiv').text(totalEv.toLocaleString());
            }
            else {
                $('#evDiv').text((-totalBetAmount / 19.0).toLocaleString());
            }
        }
        $('#compsDiv').text((totalBetAmount / 185.0 ).toLocaleString());
    }
    else {
        $('#totalBetAmountDiv').text('0');
        $('#evDiv').text('0');
        $('#compsDiv').text('0.00');
    }
}

function setWheelType(wheelType) {
    if (wheelType === WHEEL_TYPE_0) {
        currentWheelType = WHEEL_TYPE_0;
        $('#wheelToggleImage').attr('src', WHEEL_TYPE_00_BUTTON_IMG_SRC);
        $('#layoutImage').attr('src', WHEEL_TYPE_0_LAYOUT_IMG_SRC);

        $('#layoutImage').attr('src', WHEEL_TYPE_0_LAYOUT_IMG_SRC);
        $('#win-0').removeClass('win-00').addClass('win-0').css('top', WINLOSS_ABSOLUTE_TOP);
        $('#equity-0').removeClass('equity-00').addClass('equity-0').css('top', EQUITY_ABSOLUTE_TOP);
        $('#win-00').addClass('win-hidden');
        $('#equity-00').addClass('equity-hidden');
        $('#x1-00').addClass('spot-hidden');
        $('#x1-0').css('top', 163);
        $('#highlight-0').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP - 0.25 * HIGHLIGHT_HEIGHT).css('height', HIGHLIGHT_HEIGHT * 3);

        HOTSPOTS_00_ONLY.forEach(identifier => {
            $('#' + identifier).addClass('hotspot-hidden');
        });
        HOTSPOTS_0_ONLY.forEach(identifier => {
            $('#' + identifier).removeClass('hotspot-hidden');
        });
        HOTSPOTS_0_00_OVERLAP.forEach(identifier => {
            $('#' + identifier).removeClass('hotspot-topline');
            $('#' + identifier).addClass('hotspot-inside');
        });
    
        $('#x2-0-2').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP + 2 * HOTSPOT_INSIDE_HEIGHT);
        $('#x3-0-3').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP + HOTSPOT_INSIDE_HEIGHT);
        $('#x3-0-2').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP + 3 * HOTSPOT_INSIDE_HEIGHT);
    }
    else {
        currentWheelType = WHEEL_TYPE_00;
        $('#wheelToggleImage').attr('src', WHEEL_TYPE_0_BUTTON_IMG_SRC);
        $('#layoutImage').attr('src', WHEEL_TYPE_00_LAYOUT_IMG_SRC);

        $('#win-0').removeClass('win-0').addClass('win-00').css('top', WINLOSS_ABSOLUTE_TOP + 1.5 * EQUITY_HEIGHT);
        $('#equity-0').removeClass('equity-0').addClass('equity-00').css('top', EQUITY_ABSOLUTE_TOP + 1.5 * EQUITY_HEIGHT);
        $('#win-00').removeClass('win-hidden');
        $('#equity-00').removeClass('equity-hidden');
        $('#x1-00').removeClass('spot-hidden');
        $('#x1-0').css('top', 163 + 1.5 * HOTSPOT_INSIDE_HEIGHT);
        $('#highlight-0').css('height', HOTSPOT_INSIDE_HEIGHT * 1.5);
        $('#highlight-0').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP + 1.25 * HIGHLIGHT_HEIGHT).css('height', 1.5 * HIGHLIGHT_HEIGHT);

        HOTSPOTS_00_ONLY.forEach(identifier => {
            $('#' + identifier).removeClass('hotspot-hidden');
        });
        HOTSPOTS_0_ONLY.forEach(identifier => {
            $('#' + identifier).addClass('hotspot-hidden');
        });
        HOTSPOTS_0_00_OVERLAP.forEach(identifier => {
            if (identifier !== 'x2-0-1') {
                $('#' + identifier).addClass('hotspot-topline');
                $('#' + identifier).removeClass('hotspot-inside');
            }
        });

        $('#x2-0-2').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP + 2.75 * HOTSPOT_INSIDE_HEIGHT);
        $('#x3-0-3').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP + 1.125 * HOTSPOT_INSIDE_HEIGHT);
        $('#x3-0-2').css('top', HOTSPOT_INSIDE_ABSOLUTE_TOP + 3.25 * HOTSPOT_INSIDE_HEIGHT);
    }
    clearBets();
}

function resetEquityPerSpot() {
    equityPerSpot = {};
    $('.equity div').text('');
}

function updateEquityPerSpot() {
    let betInfo;
    let currentWager;
    let currentNumbersCovered;
    let currentNumber;

    resetEquityPerSpot();

    for (const spot in wagers) {
        betInfo = getBetInfo(spot);
        currentWager = wagers[spot];
        currentNumbersCovered = betInfo.numbersCovered.length;

        for (let i = 0; i < currentNumbersCovered; i++) {
            currentNumber = betInfo.numbersCovered[i];
            if (!equityPerSpot[currentNumber]) {
                equityPerSpot[currentNumber] = 0.00;
            }

            if (currentNumbersCovered === 5) {
                // TODO: Handle the x5 top line bet
                equityPerSpot[currentNumber] += currentWager / currentNumbersCovered;
            }
            else {
                equityPerSpot[currentNumber] += currentWager / currentNumbersCovered;
            }

        }

        $('#chip-' + spot + ' div').text(wagers[spot]);
    }

    for (const spot in equityPerSpot) {
        $('#equity-' + spot + ' div').text(equityPerSpot[spot].toLocaleString());
    }

    let totalBetAmount = 0;
    for (const spot in wagers) {
        totalBetAmount += wagers[spot];
    }

    $('.win div').removeClass(['amt-pos', 'amt-neg', 'amt-0']);

    ROULETTE_NUMBERS.forEach(spot => {
        if (!equityPerSpot[spot]) {
            if (totalBetAmount > 0)  {
                $('#win-' + spot + ' div').addClass('amt-neg');
                $('#win-' + spot + ' div').text((-totalBetAmount).toLocaleString());
            }
            else {
                $('#win-' + spot + ' div').addClass('amt-0');
                $('#win-' + spot + ' div').text('');
            }
        }
        else {
            let winLossAmount = (equityPerSpot[spot] * 36) - totalBetAmount;
            if (winLossAmount > 0) {
                //console.log('SETTING WIN SPOT TO AMT-POS CLASS ' + spot + ' wl ' + winLossAmount);
                $('#win-' + spot + ' div').addClass('amt-pos');
            }
            else if (winLossAmount < 0) {
                //console.log('SETTING WIN SPOT TO AMT-NEG CLASS ' + spot + ' wl ' + winLossAmount);
                $('#win-' + spot + ' div').addClass('amt-neg');
            }
            else {
                //console.log('SETTING WIN SPOT TO AMT-0 CLASS ' + spot);
                $('#win-' + spot + ' div').addClass('amt-0');
            }
            $('#win-' + spot + ' div').text(winLossAmount.toLocaleString());
        }
    });

    updateChart();
}

function clearBetInfoUI() {
    //$('#betInfoDiv').addClass('bet-info-hidden');

    $('#betInfoBetHeaderDiv').empty();
    $('#betInfoBetPaysDiv').empty();
    $('#betInfoBetCurrentBetDiv').empty();
    $('#betInfoBetWinningPayDiv').empty();

    if (currentWheelType === WHEEL_TYPE_0) {
        console.log('clearing hidden classes for 0');
        $('#cap-0-0').removeClass('highlight-hidden');
        $('#cap-0-0').addClass('highlight-hidden');
    }
    else {
        console.log('clearing hidden classes for 00');
        $('#cap-00-0').removeClass('highlight-hidden');
        $('#cap-00-00').removeClass('highlight-hidden');
        $('#cap-00-0').addClass('highlight-hidden');
        $('#cap-00-00').addClass('highlight-hidden');
    }

    ROULETTE_NUMBERS.forEach(spot => {
        $('#highlight-' + spot).removeClass('highlight-hidden');
        $('#highlight-' + spot).addClass('highlight-hidden');
    });
}

function setCurrentChip(chipIndex) {
    currentSelectedChipIndex = chipIndex;
    for (let i = 0; i < 6; i++) {
        $('#chip-cover-' + i).removeClass('chip-cover-hidden');
    }

    $('#chip-cover-' + chipIndex).addClass('chip-cover-hidden');
}

function clearBets() {
    wagers = {};
    chipBuffer = [];
    $('.chip-bet').remove();

    updateEquityPerSpot();
    updateTotalAmounts();
    updateConfiguration();
}

function undoLastBet() {
    if (chipBuffer.length === 0) {
        // Nothing to do
        return;
    }

    let lastBet = chipBuffer.pop();
    let currentAmount = wagers[lastBet.wagerKey];

    if (lastBet.amount === currentAmount) {
        // Remove chip from DOM
        $('#chip-' + lastBet.wagerKey).remove();
        delete wagers[lastBet.wagerKey];
    }
    else {
        wagers[lastBet.wagerKey] -= lastBet.amount;
    }

    updateEquityPerSpot();
    updateTotalAmounts();
    updateConfiguration();
}

function martingaleBet() {
    for (const key in wagers) {
        wagers[key] *= 2;
    }
    chipBuffer = [];

    updateEquityPerSpot();
    updateTotalAmounts();
    updateConfiguration();
}

function halveBet() {
    for (const key in wagers) {
        wagers[key] = parseInt(wagers[key] / 2);
        if (wagers[key] < 1) {
            wagers[key] = 1;
        }
    }
    chipBuffer = [];

    updateEquityPerSpot();
    updateTotalAmounts();
    updateConfiguration();
}

function onSpotClick(element) {
    // TODO: DON'T ALLOW BETS OVER $5000

    if (wagers[element.id]) {
        // Update existing chip
        wagers[element.id] += CHIP_AMOUNTS[currentSelectedChipIndex];
        $('#chip-' + element.id + ' div').text(wagers[element.id]);
    }
    else {
        // Add chip to DOM
        addBettingChip(element.id, currentSelectedChipIndex);
        wagers[element.id] = CHIP_AMOUNTS[currentSelectedChipIndex];
    }

    // Add to chipBuffer;
    chipBuffer.push({
        wagerKey: element.id,
        amount: CHIP_AMOUNTS[currentSelectedChipIndex]
    });

    //console.log(chipBuffer);

    setChipImage(element.id);
    updateBetInfoUI(element.id);
    updateTotalAmounts();
    updateEquityPerSpot();
    updateConfiguration();

    // Deselect anything that is highlighted
    if (window.getSelection) {
        window.getSelection().removeAllRanges();
    }
    else if (document.selection) {
        document.selection.empty();
    }
}

function setChipImage(spotId) {
    let wagerAmount = wagers[spotId];
    let src = IMG_SRC_CHIP_1000_BLANK;
    if (wagerAmount < 5) {
        src = IMG_SRC_CHIP_1_BLANK;
    }
    else if (wagerAmount < 25) {
        src = IMG_SRC_CHIP_5_BLANK;
    }
    else if (wagerAmount < 100) {
        src = IMG_SRC_CHIP_25_BLANK;
    }
    else if (wagerAmount < 500) {
        src = IMG_SRC_CHIP_100_BLANK;
    }
    else if (wagerAmount < 1000) {
        src = IMG_SRC_CHIP_500_BLANK;
    }
    $('#chip-img-' + spotId ).attr('src', src);

}

function updateConfiguration() {
    $('#wager-config-textarea').val(JSON.stringify(wagers));
}

function getBetInfo(identifier) {
    let identifierParts = identifier.split('-');
    if (identifierParts.length < 2 || identifierParts > 3) {
        console.error('COULD NOT PARSE identifier: [' + identifier + ']');
        return null;
    }

    let betType = identifierParts[0];
    let payout = getPayout(betType);
    let numberCount = parseInt(identifierParts[0].substring(1));
    let identifierPart2 = identifierParts.length === 3 ? identifierParts[2] : null;
    let numbersCovered = getNumbersCovered(betType, identifierParts[1], identifierPart2);
    let canonicalName = getCanonicalName(betType, identifierParts[1], identifierPart2);

    return {
        identifier: identifier,
        betType: betType,
        payout: payout,
        numberCount: numberCount,
        numbersCovered: numbersCovered,
        canonicalName: canonicalName
    }
}

function getPayout(betType) {
    switch (betType) {
        case 'x1':
            return 35;
        case 'x2':
            return 17;
        case 'x3':
            return 11;
        case 'x4':
            return 8;
        case 'x5':
            return 6; // Top Line Bet
        case 'x6':
            return 5;
        case 'x12':
            return 2;
        case 'x18':
            return 1;
    }

    return null;
}

function getNumbersCovered(betType, identifierPart1, identifierPart2) {
    // All Straight Up Bets
    if (betType === 'x1') {
        return [identifierPart1];
    }
    if (betType === 'x2') {
        return [identifierPart1, identifierPart2];
    }
    // Top Line Bet
    if (betType === 'x5') {
        return ['0', '00', '1', '2', '3'];
    }

    let identifierPart1Value = parseInt(identifierPart1);
    let identifierPart2Value = parseInt(identifierPart2);
    let returnValue = [identifierPart1];

    if (betType === 'x3' && identifierPart1 === 'basket') {
        return ['0', '00', '2'];
    }

    // Don't add 1 to identifierPart1 because of 'x3-0-3' - You have to subtract 1 from identifierPart2
    if (betType === 'x3' ) {
        return [identifierPart1, (identifierPart2Value - 1).toString(), identifierPart2];
    }

    if (betType === 'x4' ) {
        return [identifierPart1, (identifierPart1Value + 1).toString(), (identifierPart2Value - 1).toString(), identifierPart2];
    }

    if (betType === 'x6' ) {
        return [
            identifierPart1,
            (identifierPart1Value + 1).toString(),
            (identifierPart1Value + 2).toString(),
            (identifierPart1Value + 3).toString(),
            (identifierPart1Value + 4).toString(),
            identifierPart2];
    }

    if (betType === 'x12') {
        if (identifierPart1 === 'doz3') {
            return ROULETTE_NUMBERS_DOZ3;
        }
        if (identifierPart1 === 'doz2') {
            return ROULETTE_NUMBERS_DOZ2;
        }
        if (identifierPart1 === 'doz1') {
            return ROULETTE_NUMBERS_DOZ1;
        }
        if (identifierPart1 === 'col3') {
            return ROULETTE_NUMBERS_COL3;
        }
        if (identifierPart1 === 'col2') {
            return ROULETTE_NUMBERS_COL2;
        }
        return ROULETTE_NUMBERS_COL1;
    }

    if (betType === 'x18') {
        if (identifierPart1 === 'high') {
            return ROULETTE_NUMBERS_HIGH;
        }
        if (identifierPart1 === 'low') {
            return ROULETTE_NUMBERS_LOW;
        }
        if (identifierPart1 === 'red') {
            return ROULETTE_NUMBERS_RED;
        }
        if (identifierPart1 === 'black') {
            return ROULETTE_NUMBERS_BLACK;
        }
        if (identifierPart1 === 'odd') {
            return ROULETTE_NUMBERS_ODD;
        }
        return ROULETTE_NUMBERS_EVEN;
    }

    return returnValue;
}

function getCanonicalName(betType, identifierPart1, identifierPart2) {
    if (betType === 'x3' && identifierPart1 === 'basket') {
        return '0-00-2 3-Number Bet';        
    }
    if (betType === 'x3' && identifierPart1 === '0' && identifierPart2 === '2') {
        return '0-1-2 3-Number Bet';        
    }
    if (betType === 'x3' && identifierPart1 === '0' && identifierPart2 === '3') {
        return '0-2-3 3-Number Bet';        
    }
    if (betType === 'x3' && identifierPart1 === '00' && identifierPart2 === '3') {
        return '00-2-3 3-Number Bet';        
    }
    if (betType === 'x4' && identifierPart1 === '0' && identifierPart2 === '3') {
        return '0-1-2-3 4-Number Bet';        
    }

    switch (betType) {
        case 'x1':
            return identifierPart1 + ' Straight-up';
        case 'x2':
            return identifierPart1 + '-' + identifierPart2 + ' Split';
        case 'x3':
            return identifierPart1 + '-' + identifierPart2 + ' Street';
        case 'x4':
            return identifierPart1 + '-' + identifierPart2 + ' Corner';
        case 'x5':
            return 'Top Line';
        case 'x6':
            return identifierPart1 + '-' + identifierPart2 + ' Double Street';
    }

    if (betType === 'x12') {
        if (identifierPart1 === 'doz3') {
            return '3rd Dozen';
        }
        if (identifierPart1 === 'doz2') {
            return '2nd Dozen';
        }
        if (identifierPart1 === 'doz1') {
            return '1st Dozen';
        }
        if (identifierPart1 === 'col3') {
            return '3rd Column';
        }
        if (identifierPart1 === 'doz2') {
            return '2nd Column';
        }
        return '1st Column';
    }

    if (betType === 'x18') {
        if (identifierPart1 === 'high') {
            return '19-36';
        }
        if (identifierPart1 === 'low') {
            return '1-18';
        }
        if (identifierPart1 === 'red') {
            return 'Red';
        }
        if (identifierPart1 === 'black') {
            return 'Black';
        }
        if (identifierPart1 === 'odd') {
            return 'Odd';
        }
        return 'Even';
    }

    return null;
}

function createHotspots() {
    let isGreen = false;
    let index = 0;

    addHotSpot('x1-0', false, HOTSPOT_INSIDE_ABSOLUTE_LEFT - HOTSPOT_INSIDE_WIDTH, 163, 'hotspot-inside');
    addHotSpot('x2-0-00', true, HOTSPOT_INSIDE_ABSOLUTE_LEFT - HOTSPOT_INSIDE_WIDTH, HOTSPOT_INSIDE_ABSOLUTE_TOP + 2 * HOTSPOT_INSIDE_HEIGHT, 'hotspot-inside');
    addHotSpot('x1-00', false, HOTSPOT_INSIDE_ABSOLUTE_LEFT - HOTSPOT_INSIDE_WIDTH, HOTSPOT_INSIDE_ABSOLUTE_TOP + 0.5 * HOTSPOT_INSIDE_HEIGHT, 'hotspot-inside');

    // Hotspots ONLY visible with 00
    'x3-0-3'
    addHotSpot('x2-00-3', false, HOTSPOT_INSIDE_ABSOLUTE_LEFT, HOTSPOT_INSIDE_ABSOLUTE_TOP + 0.25 * HOTSPOT_INSIDE_HEIGHT, 'hotspot-inside');
    addHotSpot('x3-00-3', true, HOTSPOT_INSIDE_ABSOLUTE_LEFT, HOTSPOT_INSIDE_ABSOLUTE_TOP + 1.25 * HOTSPOT_INSIDE_HEIGHT, 'hotspot-topline');
    addHotSpot('x2-00-2', false, HOTSPOT_INSIDE_ABSOLUTE_LEFT, HOTSPOT_INSIDE_ABSOLUTE_TOP + 1.75 * HOTSPOT_INSIDE_HEIGHT, 'hotspot-topline');
    addHotSpot('x3-basket', true, HOTSPOT_INSIDE_ABSOLUTE_LEFT, HOTSPOT_INSIDE_ABSOLUTE_TOP + 2.25 * HOTSPOT_INSIDE_HEIGHT, 'hotspot-topline');
    addHotSpot('x5-topline', true, HOTSPOT_INSIDE_ABSOLUTE_LEFT, HOTSPOT_INSIDE_ABSOLUTE_TOP + 5 * HOTSPOT_INSIDE_HEIGHT, 'hotspot-inside');

    addHotSpot('x12-doz1', true, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT, HOTSPOT_OUTSIDE_ABSOLUTE_TOP, 'hotspot-outside-dozen');
    addHotSpot('x12-doz2', false, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT + HOTSPOT_OUTSIDE_DOZEN_WIDTH, HOTSPOT_OUTSIDE_ABSOLUTE_TOP, 'hotspot-outside-dozen');
    addHotSpot('x12-doz3', true, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT + 2 * HOTSPOT_OUTSIDE_DOZEN_WIDTH, HOTSPOT_OUTSIDE_ABSOLUTE_TOP, 'hotspot-outside-dozen');

    addHotSpot('x12-col3', false, HOTSPOT_INSIDE_ABSOLUTE_LEFT + 24.6 * HOTSPOT_INSIDE_WIDTH, HOTSPOT_INSIDE_ABSOLUTE_TOP - 0.25 * HOTSPOT_OUTSIDE_COLUMN_HEIGHT, 'hotspot-outside-column');
    addHotSpot('x12-col2', true, HOTSPOT_INSIDE_ABSOLUTE_LEFT + 24.6 * HOTSPOT_INSIDE_WIDTH, HOTSPOT_INSIDE_ABSOLUTE_TOP + 0.75 * HOTSPOT_OUTSIDE_COLUMN_HEIGHT, 'hotspot-outside-column');
    addHotSpot('x12-col1', false, HOTSPOT_INSIDE_ABSOLUTE_LEFT + 24.6 * HOTSPOT_INSIDE_WIDTH, HOTSPOT_INSIDE_ABSOLUTE_TOP + 1.75 * HOTSPOT_OUTSIDE_COLUMN_HEIGHT, 'hotspot-outside-column');

    addHotSpot('x18-low', false, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT, HOTSPOT_OUTSIDE_ABSOLUTE_TOP + HOTSPOT_OUTSIDE_HEIGHT, 'hotspot-outside-even-money');
    addHotSpot('x18-even', true, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT + HOTSPOT_OUTSIDE_EVEN_MONEY_WIDTH, HOTSPOT_OUTSIDE_ABSOLUTE_TOP + HOTSPOT_OUTSIDE_HEIGHT, 'hotspot-outside-even-money');
    addHotSpot('x18-red', false, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT + 2 * HOTSPOT_OUTSIDE_EVEN_MONEY_WIDTH, HOTSPOT_OUTSIDE_ABSOLUTE_TOP + HOTSPOT_OUTSIDE_HEIGHT, 'hotspot-outside-even-money');
    addHotSpot('x18-black', true, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT + 3 * HOTSPOT_OUTSIDE_EVEN_MONEY_WIDTH, HOTSPOT_OUTSIDE_ABSOLUTE_TOP + HOTSPOT_OUTSIDE_HEIGHT, 'hotspot-outside-even-money');
    addHotSpot('x18-odd', false, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT + 4 * HOTSPOT_OUTSIDE_EVEN_MONEY_WIDTH, HOTSPOT_OUTSIDE_ABSOLUTE_TOP + HOTSPOT_OUTSIDE_HEIGHT, 'hotspot-outside-even-money');
    addHotSpot('x18-high', true, HOTSPOT_OUTSIDE_ABSOLUTE_LEFT + 5 * HOTSPOT_OUTSIDE_EVEN_MONEY_WIDTH, HOTSPOT_OUTSIDE_ABSOLUTE_TOP + HOTSPOT_OUTSIDE_HEIGHT, 'hotspot-outside-even-money');

    // Create most Hotspots
    for (let i = 0; i < 24; i++) {
        isGreen = !isGreen;
        for (let j = 0; j < 6; j++) {
            let spot = i * 6 + j + 1;
            let left = i * HOTSPOT_INSIDE_WIDTH + HOTSPOT_INSIDE_ABSOLUTE_LEFT;
            let top = j * HOTSPOT_INSIDE_HEIGHT + HOTSPOT_INSIDE_ABSOLUTE_TOP;
            isGreen = !isGreen;

            if (index < HOTSPOT_IDENTIFIERS.length) {
                addHotSpot(HOTSPOT_IDENTIFIERS[index], isGreen, left, top, 'hotspot-inside');
            }
            else {
                addHotSpot('hotspot-' + spot, isGreen, left, top, 'hotspot-inside');
            }

            index++;
        }
    }

    HOTSPOTS_00_ONLY.forEach(identifier => {
        $('#' + identifier).addClass('hotspot-hidden');
    });
    HOTSPOTS_0_ONLY.forEach(identifier => {
        $('#' + identifier).removeClass('hotspot-hidden');
    });
}

function createEquityPerSpotDivs() {
    addEquitySpot('0', EQUITY_ABSOLUTE_LEFT - EQUITY_WIDTH, EQUITY_ABSOLUTE_TOP);
    addEquitySpot('00', EQUITY_ABSOLUTE_LEFT - EQUITY_WIDTH, EQUITY_ABSOLUTE_TOP);
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 3; j++) {
            let spot = i * 3 + j + 1;
            let left = i * EQUITY_WIDTH + EQUITY_ABSOLUTE_LEFT;
            let top = 2 * EQUITY_HEIGHT + EQUITY_ABSOLUTE_TOP - j * EQUITY_HEIGHT;

            addEquitySpot(spot, left, top);
        }
    }
}

function createWinLossSpotDivs() {
    addWinLossSpot('0', WINLOSS_ABSOLUTE_LEFT - EQUITY_WIDTH, WINLOSS_ABSOLUTE_TOP);
    addWinLossSpot('00', WINLOSS_ABSOLUTE_LEFT - EQUITY_WIDTH, WINLOSS_ABSOLUTE_TOP);
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 3; j++) {
            let spot = i * 3 + j + 1;
            let left = i * EQUITY_WIDTH + WINLOSS_ABSOLUTE_LEFT;
            let top = 2 * EQUITY_HEIGHT + WINLOSS_ABSOLUTE_TOP - j * EQUITY_HEIGHT;

            addWinLossSpot(spot, left, top);
        }
    }
}

function createSpotHighlightDivs() {
    addSpotHighlight('0', HIGHLIGHT_ABSOLUTE_LEFT - HIGHLIGHT_WIDTH_0_0, HIGHLIGHT_ABSOLUTE_TOP);
    addSpotHighlight('00', HIGHLIGHT_ABSOLUTE_LEFT - HIGHLIGHT_WIDTH_0_0, HIGHLIGHT_ABSOLUTE_TOP);
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 3; j++) {

            let spot = i * 3 + j + 1;
            let left = i * HIGHLIGHT_WIDTH + HIGHLIGHT_ABSOLUTE_LEFT;
            let top = 2 * HIGHLIGHT_HEIGHT + HIGHLIGHT_ABSOLUTE_TOP - j * HIGHLIGHT_HEIGHT;

            addSpotHighlight(spot, left, top);
        }
    }
}

function createUiElements() {
    setGraphDimensions();
    createHotspots();
    createEquityPerSpotDivs();
    createWinLossSpotDivs();
    createSpotHighlightDivs();
}

function setGraphDimensions() {
    $('#chartContainer').width(GRAPH_WIDTH);
    $('#chartContainer').height(GRAPH_HEIGHT);
}

function compareFn(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    // a must be equal to b
    return 0;
}

function updateChart() {
    let outcomeGraph = document.getElementById("outcomeGraph");
    if (outcomeGraph) {
        outcomeGraph.remove();
    }
    let canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'outcomeGraph');
    canvas.setAttribute('width', GRAPH_WIDTH);
    canvas.setAttribute('min-width', GRAPH_WIDTH);
    canvas.setAttribute('max-width', GRAPH_WIDTH);
    canvas.setAttribute('height', GRAPH_HEIGHT);
    canvas.setAttribute('min-height', GRAPH_HEIGHT);
    canvas.setAttribute('max-height', GRAPH_HEIGHT);
    document.querySelector('#chartContainer').appendChild(canvas);

    let lossesAndWins = [];

    for (let i = 0; i < 38; i++) {
        if (currentWheelType === WHEEL_TYPE_0 && i === 1) {
            continue;
        }
        let value = $('#win-' + ROULETTE_NUMBERS[i]).text();
        value = value.replace(',', '');
        if (value) {
            lossesAndWins.push(parseInt(value));
        } else {
            lossesAndWins.push(0);
        }
    }

    lossesAndWins.sort(compareFn);

    let labels = [];
    let graphData = [];
    let backgroundColors = [];
    let counter = 0;
    let worstLoss = 0;
    if (lossesAndWins.length > 0) {
        worstLoss = lossesAndWins[0];
    }
    for (let i = 0; i < lossesAndWins.length; i++) {
        counter += lossesAndWins[i];
        labels.push(i+1);
        graphData.push(lossesAndWins[i]);

        if (lossesAndWins[i] === worstLoss) {
            // Red bar
            backgroundColors.push('rgba(255, 0, 0, 1)');
        }
        else if (lossesAndWins[i] < 0) {
            // Yellow bar
            backgroundColors.push('rgba(255, 255, 0, 1)');
        }
        else {
            // Green bar
            backgroundColors.push('rgba(0, 255, 0, 1)');
        }
    }

    const ctx = $('#outcomeGraph');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Outcome',
                    data: graphData,
                    backgroundColor: backgroundColors
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    border: {
                        color: 'rgba(255, 255, 255, 1)'
                    }
                }
            }
        }
    });
}

$(document).ready(function() {
    createUiElements();
});