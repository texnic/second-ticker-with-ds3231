input.onButtonPressed(Button.A, function on_button_pressed_a() {
    let minute: number;
    //  Reset seconds.
    //  If current seconds value > 30, the minutes are increased by 1.
    //  If current seconds value <= 30, the minutes are left as is.
    //  NOTE: If minute == 59 and value > 30, an attempt will be made to set minute to 60.
    //  I am not sure what happens in this case.
    if (DS3231.second() > 30) {
        minute = DS3231.minute() + 1
    } else {
        minute = DS3231.minute()
    }
    
    DS3231.dateTime(DS3231.year(), DS3231.month(), DS3231.date(), DS3231.day(), DS3231.hour(), minute, 0)
    basic.showNumber(DS3231.minute())
    basic.showNumber(DS3231.second())
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    //  Show temperature_upper.
    basic.showNumber(DS3231.temperatureUpper())
    basic.pause(5000)
})
let s_old = 0
let s = 0
let minute2 = 0
music.setVolume(32)
basic.forever(function on_forever() {
    let x: number;
    let y: number;
    
    //  Every minute, play a sound.
    //  Every 10 seconds, play another sound.
    //  Every second, play another sound.
    //  Try to show the value of seconds with an LED.
    //  With 25 LEDs, seconds between 0 and 24 are shown, then display
    //  goes dark until the end of the minute.
    s = DS3231.second()
    if (s != s_old) {
        //  if seconds changed, do something, else repeat
        s_old = s
        if (s == 0) {
            music.playTone(523, music.beat(BeatFraction.Sixteenth))
        } else if (s % 10 == 0) {
            music.playTone(523, music.beat(BeatFraction.Half))
        } else {
            music.playTone(131, music.beat(BeatFraction.Sixteenth))
        }
        
        x = Math.floor(s / 5)
        y = s % 5
        basic.clearScreen()
        led.plot(x, y)
    }
    
})
