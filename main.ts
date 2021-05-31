function RiktigLøsning () {
    Lysstyrke = 255
    for (let index = 0; index < 3; index++) {
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
    radio.sendString("R")
    basic.pause(2000)
    Restart()
}
function Restart () {
    Check = 0
    strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
}
function FeilLøsning () {
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
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Start") {
        Sekvens = input.runningTime()
    }
})
function NeoPixelsControl () {
    if (Check == 1) {
        Steg1.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (Check == 2) {
        Steg2.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (Check == 3) {
        Steg3.showColor(neopixel.colors(NeoPixelColors.Green))
    } else if (Check == 4) {
        Mål.showColor(neopixel.colors(NeoPixelColors.Green))
        RiktigLøsning()
    }
}
function CheckpointCheck () {
    if (pins.digitalReadPin(DigitalPin.P1) == 1) {
        Check = 1
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 1 && Check == 1) {
        Check = 2
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 1 && Check == 2) {
        Check = 3
    }
    if (pins.digitalReadPin(DigitalPin.P2) == 1 && Check == 3) {
        Check = 4
    }
}
let Sekvens = 0
let Lysstyrke = 0
let Check = 0
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
Check = 0
let Sekvenslengde = 30000
Restart()
basic.forever(function () {
    CheckpointCheck()
    NeoPixelsControl()
    basic.pause(100)
})
control.inBackground(function () {
    while (true) {
        if (input.runningTime() - Sekvens == Sekvenslengde) {
            radio.sendString("Feilet")
            FeilLøsning()
        }
    }
})
