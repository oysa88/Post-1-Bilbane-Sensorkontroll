def RiktigLøsning():
    global Lysstyrke
    Lysstyrke = 255
    for index in range(4):
        for index2 in range(20):
            Lysstyrke += -12
            strip.show_color(neopixel.colors(NeoPixelColors.GREEN))
            strip.set_brightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        for index3 in range(20):
            Lysstyrke += 12
            strip.show_color(neopixel.colors(NeoPixelColors.GREEN))
            strip.set_brightness(Lysstyrke)
            strip.show()
            basic.pause(5)
    radio.send_string("T")
    basic.pause(2500)
    Restart()

def on_received_number(receivedNumber):
    if receivedNumber == 11:
        FeilLøsning()
radio.on_received_number(on_received_number)

def on_button_pressed_a():
    soundExpression.sad.play_until_done()
input.on_button_pressed(Button.A, on_button_pressed_a)

def Restart():
    global CheckTest, Check1, Check2, Check3
    CheckTest = 0
    Check1 = False
    Check2 = False
    Check3 = False
    strip.show_color(neopixel.colors(NeoPixelColors.YELLOW))
def FeilLøsning():
    global Lysstyrke
    Lysstyrke = 255
    for index4 in range(3):
        for index5 in range(20):
            Lysstyrke += -12
            strip.show_color(neopixel.colors(NeoPixelColors.RED))
            strip.set_brightness(Lysstyrke)
            strip.show()
            basic.pause(5)
        for index6 in range(20):
            Lysstyrke += 12
            strip.show_color(neopixel.colors(NeoPixelColors.RED))
            strip.set_brightness(Lysstyrke)
            strip.show()
            basic.pause(5)
    basic.pause(2000)
    Restart()
def NeoPixelsControl():
    if CheckTest == 1:
        Steg1.show_color(neopixel.colors(NeoPixelColors.GREEN))
    elif CheckTest == 2:
        Steg2.show_color(neopixel.colors(NeoPixelColors.GREEN))
    elif CheckTest == 3:
        Steg3.show_color(neopixel.colors(NeoPixelColors.GREEN))
    elif CheckTest == 4:
        Mål.show_color(neopixel.colors(NeoPixelColors.GREEN))
        radio.send_number(10)
        RiktigLøsning()
def CheckpointCheck():
    global CheckTest
    if pins.digital_read_pin(DigitalPin.P1) == 1 and CheckTest == 0:
        CheckTest = 1
        music.play_tone(262, music.beat(BeatFraction.WHOLE))
    if pins.digital_read_pin(DigitalPin.P2) == 1 and CheckTest == 1:
        CheckTest = 2
    if pins.digital_read_pin(DigitalPin.P8) == 1 and CheckTest == 2:
        CheckTest = 3
    if pins.digital_read_pin(DigitalPin.P16) == 1 and CheckTest == 3:
        CheckTest = 4
Check3 = False
Check2 = False
Check1 = False
CheckTest = 0
Lysstyrke = 0
Mål: neopixel.Strip = None
Steg3: neopixel.Strip = None
Steg2: neopixel.Strip = None
Steg1: neopixel.Strip = None
strip: neopixel.Strip = None
strip = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
Steg1 = strip.range(0, 6)
Steg2 = strip.range(0, 12)
Steg3 = strip.range(0, 18)
Mål = strip.range(0, 24)
radio.set_group(1)
Restart()

def on_forever():
    CheckpointCheck()
    NeoPixelsControl()
    basic.pause(100)
basic.forever(on_forever)
