function RiktigLøsning () {
    soundExpression.giggle.play()
    Lysstyrke = 255
    for (let index = 0; index < 4; index++) {
        for (let index = 0; index < 20; index++) {
            Lysstyrke += -12
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
        for (let index = 0; index < 20; index++) {
            Lysstyrke += 12
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
    }
    radio.sendString("T")
    basic.pause(2500)
    Restart()
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 11) {
        FeilLøsning()
    }
})
function Restart () {
    CheckTest = 0
    Check1 = false
    Check2 = false
    Check3 = false
    strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
}
function FeilLøsning () {
    soundExpression.sad.play()
    Lysstyrke = 255
    for (let index = 0; index < 3; index++) {
        for (let index = 0; index < 20; index++) {
            Lysstyrke += -12
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
        for (let index = 0; index < 20; index++) {
            Lysstyrke += 12
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            strip.setBrightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        }
    }
    basic.pause(2000)
    Restart()
}
function NeoPixelsControl () {
    if (CheckTest == 1) {
        Steg1.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (CheckTest == 2) {
        Steg2.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (CheckTest == 3) {
        Steg3.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (CheckTest == 4) {
        Mål.showColor(neopixel.colors(NeoPixelColors.Green))
        radio.sendNumber(10)
        RiktigLøsning()
    }
}
function CheckpointCheck () {
    if (pins.digitalReadPin(DigitalPin.P1) == 1 && !(Check1)) {
        Check1 = true
        CheckTest += 1
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 1 && !(Check2)) {
        Check2 = true
        CheckTest += 1
    }
    if (pins.digitalReadPin(DigitalPin.P3) == 1 && !(Check3)) {
        Check3 = true
        CheckTest += 1
    }
    if (pins.digitalReadPin(DigitalPin.P4) == 1 && CheckTest == 3) {
        CheckTest = 4
    }
}
let Check3 = false
let Check2 = false
let Check1 = false
let CheckTest = 0
let Lysstyrke = 0
let Mål: neopixel.Strip = null
let Steg3: neopixel.Strip = null
let Steg2: neopixel.Strip = null
let Steg1: neopixel.Strip = null
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P0, 16, NeoPixelMode.RGB)
Steg1 = strip.range(0, 4)
Steg2 = strip.range(0, 8)
Steg3 = strip.range(0, 12)
Mål = strip.range(0, 16)
radio.setGroup(1)
Restart()
basic.forever(function () {
    CheckpointCheck()
    NeoPixelsControl()
    basic.pause(100)
})
