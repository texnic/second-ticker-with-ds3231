def on_button_pressed_a():
    # Reset seconds.
    # If current seconds value > 30, the minutes are increased by 1.
    # If current seconds value <= 30, the minutes are left as is.
    # NOTE: If minute == 59 and value > 30, an attempt will be made to set minute to 60.
    # I am not sure what happens in this case.
    if DS3231.second() > 30:
        minute = DS3231.minute() + 1
    else:
        minute = DS3231.minute()
    DS3231.date_time(DS3231.year(),
        DS3231.month(),
        DS3231.date(),
        DS3231.day(),
        DS3231.hour(),
        minute,
        0)
    basic.show_number(DS3231.minute())
    basic.show_number(DS3231.second())
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    # Show temperature_upper.
    basic.show_number(DS3231.temperature_upper())
    basic.pause(5000)
input.on_button_pressed(Button.B, on_button_pressed_b)

s_old = 0
s = 0
minute2 = 0
music.set_volume(32)

def on_forever():
    global s, s_old
    # Every minute, play a sound.
    # Every 10 seconds, play another sound.
    # Every second, play another sound.
    # Try to show the value of seconds with an LED.
    # With 25 LEDs, seconds between 0 and 24 are shown, then display
    # goes dark until the end of the minute.
    s = DS3231.second()
    if s != s_old:
        # if seconds changed, do something, else repeat
        s_old = s
        if s == 0:
            music.play_tone(523, music.beat(BeatFraction.SIXTEENTH))
        elif s % 10 == 0:
            music.play_tone(523, music.beat(BeatFraction.HALF))
        else:
            music.play_tone(131, music.beat(BeatFraction.SIXTEENTH))
        x = Math.floor(s / 5)
        y = s % 5
        basic.clear_screen()
        led.plot(x, y)
basic.forever(on_forever)
