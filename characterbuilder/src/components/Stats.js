import React, { useState } from "react";
import "./Stats.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import { filledInputClasses } from "@mui/material";



export default function Stats() {

    const [diceMethod, setDiceMethod] = useState("Gygaxian 3d6");
    const [tooltipRevealed, setTooltipRevealed] = useState(false);

    const statArray = ['rawstr', 'rawdex', 'rawcon', 'rawint', 'rawwis', 'rawcha'];

    const MIN_RAW_STAT = 3;
    const MAX_RAW_STAT = 18;
    const BASE_STAT = 8;
    const INITIAL_POINT_BUY_BUDGET = 27;

    const racialBoosts = ["Human (non-variant)", "+1 to three stats", "+2 to one stat and +1 to another", "+2 to one stat and +1 to two others", "+2 to two stats", "+2 to one stat"]

    const theme = createTheme({
        palette: {
          primary: {
            main: '#CBF1A8',
          },
          secondary: {
            main: '#841506',
            contrastText: '#CBF1A8',
          }
        },
    });

    function roll1d6 () {
        return Math.floor(Math.random() * (6 - 1 + 1)) + 1
    }

    function stats3d6 () {
        statArray.map((stat) => {
            formik.setFieldValue(stat, roll1d6()+roll1d6()+roll1d6());
        })
    }

    function stats4d6k3 () {
        statArray.map((stat) => {
            const dice = [roll1d6(), roll1d6(), roll1d6(), roll1d6()]
            dice.sort(function(a, b){return a-b});
            dice.shift();
            formik.setFieldValue(stat, dice[0]+dice[1]+dice[2]);
        })
    }

    const formik = useFormik({
        initialValues: { 
            race: "Human (non-variant)",  
            racial1: "Select an ability",
            racial2: "Select an ability",
            racial3: "Select an ability",
            racial4: "Select an ability",
            racial5: "Select an ability",
            rawstr: BASE_STAT,
            rawdex: BASE_STAT,
            rawcon: BASE_STAT,
            rawint: BASE_STAT,
            rawwis: BASE_STAT,
            rawcha: BASE_STAT,
            str: BASE_STAT,
            dex: BASE_STAT,
            con: BASE_STAT,
            int: BASE_STAT,
            wis: BASE_STAT,
            cha: BASE_STAT,
            savename: "Character Name",
            pointBuyBudget: INITIAL_POINT_BUY_BUDGET,
            twoPointLevel: 14,
            threePointLevel: 16,
            fourPointLevel: 18,
            maxPointBuyStat: 15,
            },

        validationSchema: Yup.object({
          race: Yup.string(),
          racial1: Yup.string(),
          racial2: Yup.string(),
          racial3: Yup.string(),
          racial4: Yup.string(),
          racial5: Yup.string(),
          rawstr: Yup.number().min(MIN_RAW_STAT, "Abilities cannot be lower than 3").max(MAX_RAW_STAT, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawdex: Yup.number().min(MIN_RAW_STAT, "Abilities cannot be lower than 3").max(MAX_RAW_STAT, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawcon: Yup.number().min(MIN_RAW_STAT, "Abilities cannot be lower than 3").max(MAX_RAW_STAT, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawint: Yup.number().min(MIN_RAW_STAT, "Abilities cannot be lower than 3").max(MAX_RAW_STAT, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawwis: Yup.number().min(MIN_RAW_STAT, "Abilities cannot be lower than 3").max(MAX_RAW_STAT, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawcha: Yup.number().min(MIN_RAW_STAT, "Abilities cannot be lower than 3").max(MAX_RAW_STAT, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          str: Yup.number(),
          dex: Yup.number(),
          con: Yup.number(),
          int: Yup.number(),
          wis: Yup.number(),
          cha: Yup.number(),
          savename: Yup.string().required("A character name is needed to save"),
          pointBuyBudget: Yup.number(),
          twoPointLevel: Yup.number(),
          threePointLevel: Yup.number(),
          fourPointLevel: Yup.number(),
          maxPointBuyStat: Yup.number(),
        }),
        onSubmit: (values) => {
            localStorage.setItem("raceandstats", JSON.stringify(values));
        },
      });

    return (
        <main>
            <form
                className="framecontainer"
                onSubmit={formik.handleSubmit}
            >                    
            <ThemeProvider theme={theme}>
                <div className="racebox">
                    <h2>Race Selection</h2>
                    <div className="racelabel">Race</div>
                    <Select
                        id='race' 
                        className="dropdown"
                        {...formik.getFieldProps("race")} 
                        value={formik.values.race}
                        sx={{
                            color:'secondary.contrastText',
                        }}
                        inputProps={{
                            style:{color:'#ABE188'},
                            "data-testid": "race"
                        }}
                        onChange={e => {
                            formik.handleChange(e)
                            formik.setFieldValue("racial1", "Select an ability");
                            formik.setFieldValue("racial2", "Select an ability");
                            formik.setFieldValue("racial3", "Select an ability");
                            formik.setFieldValue("racial4", "Select an ability");
                            formik.setFieldValue("racial5", "Select an ability");
                            setTooltipRevealed(false);
                        }}
                    >
                        {racialBoosts.map((boosts) => {
                            return <MenuItem value={boosts}>{boosts}</MenuItem>;
                        })}
                        
                    </Select>
                    {(
                        formik.values.race==="+2 to one stat and +1 to another" ||
                        formik.values.race==="+2 to one stat and +1 to two others" ||
                        formik.values.race==="+2 to two stats" ||
                        formik.values.race==="+2 to one stat"
                    ) ? (
                        <div><span className="racelabel">Racial Boost +2</span>
                            <Select
                                id='racial1'
                                className="dropdown"
                                sx={{
                                    color:'secondary.contrastText'
                                }}
                                {...formik.getFieldProps("racial1")} 
                                value={formik.values.racial1}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Select an ability">Select an ability</MenuItem>
                                <MenuItem value="Strength">Strength</MenuItem>
                                <MenuItem value="Dexterity">Dexterity</MenuItem>
                                <MenuItem value="Constitution">Constitution</MenuItem>
                                <MenuItem value="Intelligence">Intelligence</MenuItem>
                                <MenuItem value="Wisdom">Wisdom</MenuItem>
                                <MenuItem value="Charisma">Charisma</MenuItem>
                            </Select>
                            {(formik.values.racial1!=="Select an ability" && 
                                (formik.values.racial1===formik.values.racial2 ||
                                    formik.values.racial1===formik.values.racial3 ||
                                    formik.values.racial1===formik.values.racial4 ||
                                    formik.values.racial1===formik.values.racial5   )
                                    ) ? (<div className="formikerror">Multiple Racial Boosts cannot be applied to the same ability</div>) : null}
                        </div>
                    ) : null}
                    {(
                        formik.values.race==="+2 to two stats"
                    ) ? (
                        <div><span className="racelabel">Racial Boost +2</span>
                            <Select
                                id='racial2'
                                className="dropdown"
                                sx={{
                                    color:'secondary.contrastText'
                                }}
                                {...formik.getFieldProps("racial2")} 
                                value={formik.values.racial2}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Select an ability">Select an ability</MenuItem>
                                <MenuItem value="Strength">Strength</MenuItem>
                                <MenuItem value="Dexterity">Dexterity</MenuItem>
                                <MenuItem value="Constitution">Constitution</MenuItem>
                                <MenuItem value="Intelligence">Intelligence</MenuItem>
                                <MenuItem value="Wisdom">Wisdom</MenuItem>
                                <MenuItem value="Charisma">Charisma</MenuItem>
                            </Select>
                            {(formik.values.racial2!=="Select an ability" && 
                                (formik.values.racial2===formik.values.racial1 ||
                                    formik.values.racial2===formik.values.racial3 ||
                                    formik.values.racial2===formik.values.racial4 ||
                                    formik.values.racial2===formik.values.racial5   )
                                    ) ? (<div className="formikerror">Multiple Racial Boosts cannot be applied to the same ability</div>) : null}
                        </div>
                    ) : null}
                                        {(
                        formik.values.race==="+2 to one stat and +1 to another" ||
                        formik.values.race==="+2 to one stat and +1 to two others" ||
                        formik.values.race==="+1 to three stats"
                    ) ? (
                        <div><span className="racelabel">Racial Boost +1</span>
                            <Select
                                id='racial3'
                                className="dropdown"
                                sx={{
                                    color:'secondary.contrastText'
                                }}
                                {...formik.getFieldProps("racial3")} 
                                value={formik.values.racial3}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Select an ability">Select an ability</MenuItem>
                                <MenuItem value="Strength">Strength</MenuItem>
                                <MenuItem value="Dexterity">Dexterity</MenuItem>
                                <MenuItem value="Constitution">Constitution</MenuItem>
                                <MenuItem value="Intelligence">Intelligence</MenuItem>
                                <MenuItem value="Wisdom">Wisdom</MenuItem>
                                <MenuItem value="Charisma">Charisma</MenuItem>
                            </Select>
                            {(formik.values.racial3!=="Select an ability" && 
                                (formik.values.racial3===formik.values.racial1 ||
                                    formik.values.racial3===formik.values.racial2 ||
                                    formik.values.racial3===formik.values.racial4 ||
                                    formik.values.racial3===formik.values.racial5   )
                                    ) ? (<div className="formikerror">Multiple Racial Boosts cannot be applied to the same ability</div>) : null}
                        </div>
                        ) : null}
                    {(
                        formik.values.race==="+2 to one stat and +1 to two others" ||
                        formik.values.race==="+1 to three stats"
                    ) ? (
                        <div><span className="racelabel">Racial Boost +1</span>
                            <Select
                                id='racial4'
                                className="dropdown"
                                sx={{
                                    color:'secondary.contrastText'
                                }}
                                {...formik.getFieldProps("racial4")} 
                                value={formik.values.racial4}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Select an ability">Select an ability</MenuItem>
                                <MenuItem value="Strength">Strength</MenuItem>
                                <MenuItem value="Dexterity">Dexterity</MenuItem>
                                <MenuItem value="Constitution">Constitution</MenuItem>
                                <MenuItem value="Intelligence">Intelligence</MenuItem>
                                <MenuItem value="Wisdom">Wisdom</MenuItem>
                                <MenuItem value="Charisma">Charisma</MenuItem>
                            </Select>
                            {(formik.values.racial4!=="Select an ability" && 
                                (formik.values.racial4===formik.values.racial1 ||
                                    formik.values.racial4===formik.values.racial2 ||
                                    formik.values.racial4===formik.values.racial3 ||
                                    formik.values.racial4===formik.values.racial5   )
                                    ) ? (<div className="formikerror">Multiple Racial Boosts cannot be applied to the same ability</div>) : null}
                        </div>                  
                    ) : null}
                                        {(
                        formik.values.race==="+1 to three stats"
                    ) ? (
                        <div><span className="racelabel">Racial Boost +1</span>
                            <Select
                                id='racial5'
                                className="dropdown"
                                sx={{
                                    color:'secondary.contrastText'
                                }}
                                {...formik.getFieldProps("racial5")} 
                                value={formik.values.racial5}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value="Select an ability">Select an ability</MenuItem>
                                <MenuItem value="Strength">Strength</MenuItem>
                                <MenuItem value="Dexterity">Dexterity</MenuItem>
                                <MenuItem value="Constitution">Constitution</MenuItem>
                                <MenuItem value="Intelligence">Intelligence</MenuItem>
                                <MenuItem value="Wisdom">Wisdom</MenuItem>
                                <MenuItem value="Charisma">Charisma</MenuItem>
                            </Select>
                            {(formik.values.racial5!=="Select an ability" && 
                                (formik.values.racial5===formik.values.racial1 ||
                                    formik.values.racial5===formik.values.racial2 ||
                                    formik.values.racial5===formik.values.racial3 ||
                                    formik.values.racial5===formik.values.racial4   )
                                    ) ? (<div className="formikerror">Multiple Racial Boosts cannot be applied to the same ability</div>) : null}
                        </div>                  
                    ) : null}
                </div>
                <div className="statbox">
                    <h2><div></div><div>Ability Scores</div>
                        <HelpIcon
                            sx={{ fontSize: 15 }}  
                            onClick={e => {
                                setTooltipRevealed(!tooltipRevealed);
                            }} />
                        {tooltipRevealed ? <div class='tooltip'>The Raw Stats column displays the ability scores you've purchased with the point buy system, without racial modifiers. The Total Stats column reflects the same scores but with racial modifiers applied.</div> : null}</h2>
                    
                        <div className="abilityscorelabel">Ability</div>
                        <div>Raw Stats</div>
                        <div></div>
                        <div>Total Stats</div>
                        <div className="abilityscorelabel">Strength:</div>
                        <div>
                            <TextField
                                className='abilityscore' 
                                type='number' 
                                inputProps={{ "data-testid": "rawstr" }}
                                {...formik.getFieldProps("rawstr")}
                                value={formik.values.rawstr}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className="abilityUpDown">
                            <ArrowDropUpIcon onClick={e => {
                                formik.setFieldValue("rawstr", formik.values.rawstr+1);
                                }}>
                            </ArrowDropUpIcon>
                            <ArrowDropDownIcon onClick={e => {
                                formik.setFieldValue("rawstr", formik.values.rawstr-1);
                                }}>
                            </ArrowDropDownIcon>
                        </div>
                        <div>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                className='abilityscore' 
                                type='number' 
                                {...formik.getFieldProps("str")}
                                onChange={formik.handleChange}
                                value={formik.values.rawstr+((formik.values.racial1==="Strength" || formik.values.racial2==="Strength") ? 2 
                                : (formik.values.racial3==="Strength" || formik.values.racial4==="Strength" || formik.values.racial5==="Strength" || formik.values.race==="Human (non-variant)") ? 1 
                                : 0)}>
                            </TextField>
                        </div>
                        <div className='abilityscoreerror'>
                            {formik.touched.rawstr && formik.errors.rawstr ? (<span data-testid="strerror" className="formikerror">{formik.errors.rawstr}</span>) : null}
                        </div>
                        <div className="abilityscorelabel">Dexterity:</div>
                        <div>
                            <TextField 
                                className='abilityscore' 
                                type='number' 
                                inputProps={{ "data-testid": "rawdex" }}
                                {...formik.getFieldProps("rawdex")}
                                value={formik.values.rawdex}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className="abilityUpDown">
                            <ArrowDropUpIcon onClick={e => {
                                formik.setFieldValue("rawdex", formik.values.rawdex+1);
                                }}>
                            </ArrowDropUpIcon>
                            <ArrowDropDownIcon onClick={e => {
                                formik.setFieldValue("rawdex", formik.values.rawdex-1);
                                }}>
                            </ArrowDropDownIcon>
                        </div>
                        <div>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                className='abilityscore' 
                                type='number' 
                                {...formik.getFieldProps("dex")}
                                value={formik.values.rawdex + ((formik.values.racial1==="Dexterity" || formik.values.racial2==="Dexterity") ? 2 
                                : (formik.values.racial3==="Dexterity" || formik.values.racial4==="Dexterity" || formik.values.racial5==="Dexterity" || formik.values.race==="Human (non-variant)") ? 1 
                                : 0)}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className='abilityscoreerror'>
                            {formik.touched.rawdex && formik.errors.rawdex ? (<span className="formikerror">{formik.errors.rawdex}</span>) : null}
                        </div>
                        <div className="abilityscorelabel">Constitution:</div>
                        <div>
                            <TextField 
                                className='abilityscore' 
                                type='number'
                                inputProps={{ "data-testid": "rawcon" }}
                                {...formik.getFieldProps("rawcon")}
                                value={formik.values.rawcon}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className="abilityUpDown">
                            <ArrowDropUpIcon onClick={e => {
                                formik.setFieldValue("rawcon", formik.values.rawcon+1);
                                }}>
                            </ArrowDropUpIcon>
                            <ArrowDropDownIcon onClick={e => {
                                formik.setFieldValue("rawcon", formik.values.rawcon-1);
                                }}>
                            </ArrowDropDownIcon>
                        </div>
                        <div>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                className='abilityscore' 
                                type='number' 
                                {...formik.getFieldProps("con")}
                                value={formik.values.rawcon + ((formik.values.racial1==="Constitution" || formik.values.racial2==="Constitution") ? 2 
                                : (formik.values.racial3==="Constitution" || formik.values.racial4==="Constitution" || formik.values.racial5==="Constitution" || formik.values.race==="Human (non-variant)") ? 1 
                                : 0)}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className='abilityscoreerror'>
                            {formik.touched.rawcon && formik.errors.rawcon ? (<span className="formikerror">{formik.errors.rawcon}</span>) : null}
                        </div>
                        <div className="abilityscorelabel">Intelligence:</div>
                        <div>
                            <TextField 
                                className='abilityscore' 
                                type='number' 
                                inputProps={{ "data-testid": "rawint" }}
                                {...formik.getFieldProps("rawint")}
                                value={formik.values.rawint}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className="abilityUpDown">
                            <ArrowDropUpIcon onClick={e => {
                                formik.setFieldValue("rawint", formik.values.rawint+1);
                                }}>
                            </ArrowDropUpIcon>
                            <ArrowDropDownIcon onClick={e => {
                                formik.setFieldValue("rawint", formik.values.rawint-1);
                                }}>
                            </ArrowDropDownIcon>
                        </div>
                        <div>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                className='abilityscore' 
                                type='number' 
                                {...formik.getFieldProps("int")}
                                value={formik.values.rawint + ((formik.values.racial1==="Intelligence" || formik.values.racial2==="Intelligence") ? 2 
                                : (formik.values.racial3==="Intelligence" || formik.values.racial4==="Intelligence" || formik.values.racial5==="Intelligence" || formik.values.race==="Human (non-variant)") ? 1 
                                : 0)}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className='abilityscoreerror'>
                            {formik.touched.rawint && formik.errors.rawint ? (<span className="formikerror">{formik.errors.rawint}</span>) : null}
                        </div>
                        <div className="abilityscorelabel">Wisdom:</div>
                        <div>
                            <TextField 
                                className='abilityscore' 
                                type='number' 
                                inputProps={{ "data-testid": "rawwis" }}
                                {...formik.getFieldProps("rawwis")}
                                value={formik.values.rawwis}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className="abilityUpDown">
                            <ArrowDropUpIcon onClick={e => {
                                formik.setFieldValue("rawwis", formik.values.rawwis+1);
                                }}>
                            </ArrowDropUpIcon>
                            <ArrowDropDownIcon onClick={e => {
                                formik.setFieldValue("rawwis", formik.values.rawwis-1);
                                }}>
                            </ArrowDropDownIcon>
                        </div>
                        <div>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                className='abilityscore' 
                                type='number' 
                                {...formik.getFieldProps("wis")}
                                value={formik.values.rawwis + ((formik.values.racial1==="Wisdom" || formik.values.racial2==="Wisdom") ? 2 
                                : (formik.values.racial3==="Wisdom" || formik.values.racial4==="Wisdom" || formik.values.racial5==="Wisdom" || formik.values.race==="Human (non-variant)") ? 1 
                                : 0)}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className='abilityscoreerror'>
                            {formik.touched.rawwis && formik.errors.rawwis ? (<span className="formikerror">{formik.errors.rawwis}</span>) : null}
                        </div>
                        <div className="abilityscorelabel">Charisma:</div>
                        <div>
                            <TextField 
                                className='abilityscore' 
                                type='number' 
                                inputProps={{ "data-testid": "rawcha" }}
                                {...formik.getFieldProps("rawcha")}
                                value={formik.values.rawcha}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className="abilityUpDown">
                            <ArrowDropUpIcon onClick={e => {
                                formik.setFieldValue("rawcha", formik.values.rawcha+1);
                                }}>
                            </ArrowDropUpIcon>
                            <ArrowDropDownIcon onClick={e => {
                                formik.setFieldValue("rawcha", formik.values.rawcha-1);
                                }}>
                            </ArrowDropDownIcon>
                        </div>
                        <div>
                            <TextField
                                InputProps={{
                                    readOnly: true,
                                }}
                                className='abilityscore' 
                                type='number' 
                                {...formik.getFieldProps("cha")}
                                value={formik.values.rawcha + ((formik.values.racial1==="Charisma" || formik.values.racial2==="Charisma") ? 2 
                                : (formik.values.racial3==="Charisma" || formik.values.racial4==="Charisma" || formik.values.racial5==="Charisma" || formik.values.race==="Human (non-variant)") ? 1 
                                : 0)}
                                onChange={formik.handleChange}>
                            </TextField>
                        </div>
                        <div className='abilityscoreerror'>
                            {formik.touched.rawcha && formik.errors.rawcha ? (<span className="formikerror">{formik.errors.rawcha}</span>) : null}
                        </div>
                        <div className="pointbuycalc">Point Buy {(
                            formik.values.rawstr>formik.values.maxPointBuyStat ||
                            formik.values.rawstr<MIN_RAW_STAT  ||
                            formik.values.rawdex>formik.values.maxPointBuyStat ||
                            formik.values.rawdex<MIN_RAW_STAT  ||
                            formik.values.rawcon>formik.values.maxPointBuyStat ||
                            formik.values.rawcon<MIN_RAW_STAT  ||
                            formik.values.rawint>formik.values.maxPointBuyStat ||
                            formik.values.rawint<MIN_RAW_STAT  ||
                            formik.values.rawwis>formik.values.maxPointBuyStat ||
                            formik.values.rawwis<MIN_RAW_STAT  ||
                            formik.values.rawcha>formik.values.maxPointBuyStat ||
                            formik.values.rawcha<MIN_RAW_STAT
                            ) 
                            ? "NA" : (
                                formik.values.rawstr - BASE_STAT +
                                formik.values.rawdex - BASE_STAT +
                                formik.values.rawcon - BASE_STAT +
                                formik.values.rawint - BASE_STAT +
                                formik.values.rawwis - BASE_STAT +
                                formik.values.rawcha - BASE_STAT +
                                (formik.values.rawstr>formik.values.twoPointLevel-1 ? formik.values.rawstr-(formik.values.twoPointLevel-1) : 0) +
                                (formik.values.rawdex>formik.values.twoPointLevel-1 ? formik.values.rawdex-(formik.values.twoPointLevel-1) : 0) +
                                (formik.values.rawcon>formik.values.twoPointLevel-1 ? formik.values.rawcon-(formik.values.twoPointLevel-1) : 0) +
                                (formik.values.rawint>formik.values.twoPointLevel-1 ? formik.values.rawint-(formik.values.twoPointLevel-1) : 0) +
                                (formik.values.rawwis>formik.values.twoPointLevel-1 ? formik.values.rawwis-(formik.values.twoPointLevel-1) : 0) +
                                (formik.values.rawcha>formik.values.twoPointLevel-1 ? formik.values.rawcha-(formik.values.twoPointLevel-1) : 0) +
                                (formik.values.rawstr>formik.values.threePointLevel-1 ? formik.values.rawstr-(formik.values.threePointLevel-1) : 0) +
                                (formik.values.rawdex>formik.values.threePointLevel-1 ? formik.values.rawdex-(formik.values.threePointLevel-1) : 0) +
                                (formik.values.rawcon>formik.values.threePointLevel-1 ? formik.values.rawcon-(formik.values.threePointLevel-1) : 0) +
                                (formik.values.rawint>formik.values.threePointLevel-1 ? formik.values.rawint-(formik.values.threePointLevel-1) : 0) +
                                (formik.values.rawwis>formik.values.threePointLevel-1 ? formik.values.rawwis-(formik.values.threePointLevel-1) : 0) +
                                (formik.values.rawcha>formik.values.threePointLevel-1 ? formik.values.rawcha-(formik.values.threePointLevel-1) : 0) +
                                (formik.values.rawstr>formik.values.fourPointLevel-1 ? formik.values.rawstr-(formik.values.fourPointLevel-1) : 0) +
                                (formik.values.rawdex>formik.values.fourPointLevel-1 ? formik.values.rawdex-(formik.values.fourPointLevel-1) : 0) +
                                (formik.values.rawcon>formik.values.fourPointLevel-1 ? formik.values.rawcon-(formik.values.fourPointLevel-1) : 0) +
                                (formik.values.rawint>formik.values.fourPointLevel-1 ? formik.values.rawint-(formik.values.fourPointLevel-1) : 0) +
                                (formik.values.rawwis>formik.values.fourPointLevel-1 ? formik.values.rawwis-(formik.values.fourPointLevel-1) : 0) +
                                (formik.values.rawcha>formik.values.fourPointLevel-1 ? formik.values.rawcha-(formik.values.fourPointLevel-1) : 0)
                            )}/{formik.values.pointBuyBudget}
                        </div>
                    </div>
                    <div className="thirdbox">
                    <div className="saveAndLoad">
                        <h2>Save and Load</h2>
                        <TextField
                            id='savename' 
                            variant="outlined"
                            {...formik.getFieldProps("savename")}
                            value={formik.values.savename}
                            onChange={formik.handleChange}>
                        </TextField>
                        <Button variant='contained' type="submit">Save Stats</Button>
                        <Button variant='contained' type="button" onClick={e => {
                            formik.setFieldValue("race", JSON.parse(localStorage.getItem("raceandstats")).race);
                            formik.setFieldValue("racial1", JSON.parse(localStorage.getItem("raceandstats")).racial1);
                            formik.setFieldValue("racial2", JSON.parse(localStorage.getItem("raceandstats")).racial2);
                            formik.setFieldValue("racial3", JSON.parse(localStorage.getItem("raceandstats")).racial3);
                            formik.setFieldValue("racial4", JSON.parse(localStorage.getItem("raceandstats")).racial4);
                            formik.setFieldValue("rawstr", JSON.parse(localStorage.getItem("raceandstats")).rawstr);
                            formik.setFieldValue("rawdex", JSON.parse(localStorage.getItem("raceandstats")).rawdex);
                            formik.setFieldValue("rawcon", JSON.parse(localStorage.getItem("raceandstats")).rawcon);
                            formik.setFieldValue("rawint", JSON.parse(localStorage.getItem("raceandstats")).rawint);
                            formik.setFieldValue("rawwis", JSON.parse(localStorage.getItem("raceandstats")).rawwis);
                            formik.setFieldValue("rawcha", JSON.parse(localStorage.getItem("raceandstats")).rawcha);
                            formik.setFieldValue("savename", JSON.parse(localStorage.getItem("raceandstats")).savename);
                            formik.setFieldValue("pointBuyBudget", JSON.parse(localStorage.getItem("raceandstats")).pointBuyBudget);
                            formik.setFieldValue("twoPointLevel", JSON.parse(localStorage.getItem("raceandstats")).twoPointLevel);
                            formik.setFieldValue("threePointLevel", JSON.parse(localStorage.getItem("raceandstats")).threePointLevel);
                            formik.setFieldValue("fourPointLevel", JSON.parse(localStorage.getItem("raceandstats")).fourPointLevel);
                        }}>Load Stats</Button>
                        {formik.touched.savename && formik.errors.savename ? (
                        <div>{formik.errors.savename}</div>
                        ) : null}
                    </div>
                <div className="statRollerContainer">
                <h2>Stat Roller</h2>
                <Select
                    id='DiceMethod'
                    className="dropdown"
                    sx={{
                        color:'secondary.contrastText'
                    }}
                    value={diceMethod}
                    placeholder="Select a Dice Method"
                    onChange={(event) => setDiceMethod(event.target.value)}
                    >
                        <MenuItem value="Gygaxian 3d6">Gygaxian 3d6</MenuItem>
                        <MenuItem value="4d6 Drop the Lowest">4d6 Drop the Lowest</MenuItem>
                </Select>
                <Button 
                    variant='contained' 
                    type="button" 

                    onClick={e => {
                        if (diceMethod === "Gygaxian 3d6") {
                            stats3d6();
                        } else if (diceMethod === "4d6 Drop the Lowest") {
                            stats4d6k3();
                        } else {
                            console.log("not implemented")
                        }
                }}>Roll Stats</Button>
                </div>
                </div>
                <div className="optionsContainer">
                    <h2>Point Buy Options</h2>
                    <div>
                        <div>Point Buy Budget</div>
                        <div className="optionField">
                            <TextField
                                className="optionInput"
                                type='number' 
                                {...formik.getFieldProps("pointBuyBudget")}
                                value={formik.values.pointBuyBudget}
                                onChange={formik.handleChange}>
                            </TextField>
                            <div className="abilityUpDown">
                                <ArrowDropUpIcon onClick={e => {
                                    formik.setFieldValue("pointBuyBudget", formik.values.pointBuyBudget+1);
                                    }}>
                                </ArrowDropUpIcon>
                                <ArrowDropDownIcon onClick={e => {
                                    formik.setFieldValue("pointBuyBudget", formik.values.pointBuyBudget-1);
                                    }}>
                                </ArrowDropDownIcon>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>Two-Point Step</div>
                        <div className="optionField">
                            <TextField
                                className="optionInput"
                                type='number' 
                                {...formik.getFieldProps("twoPointLevel")}
                                value={formik.values.twoPointLevel}
                                onChange={formik.handleChange}>
                            </TextField>
                            <div className="abilityUpDown">
                                <ArrowDropUpIcon onClick={e => {
                                    formik.setFieldValue("twoPointLevel", formik.values.twoPointLevel+1);
                                    }}>
                                </ArrowDropUpIcon>
                                <ArrowDropDownIcon onClick={e => {
                                    formik.setFieldValue("twoPointLevel", formik.values.twoPointLevel-1);                                        }}>
                                </ArrowDropDownIcon>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>Three-Point Step</div>
                        <div className="optionField">
                            <TextField
                                className="optionInput"
                                type='number' 
                                {...formik.getFieldProps("threePointLevel")}
                                value={formik.values.threePointLevel}
                                onChange={formik.handleChange}>
                            </TextField>
                            <div className="abilityUpDown">
                                <ArrowDropUpIcon onClick={e => {
                                    formik.setFieldValue("threePointLevel", formik.values.threePointLevel+1);
                                    }}>
                                </ArrowDropUpIcon>
                                <ArrowDropDownIcon onClick={e => {
                                    formik.setFieldValue("threePointLevel", formik.values.threePointLevel-1);                                        }}>
                                </ArrowDropDownIcon>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>Four-Point Step</div>
                        <div className="optionField">
                            <TextField
                                className="optionInput"
                                type='number' 
                                {...formik.getFieldProps("fourPointLevel")}
                                value={formik.values.fourPointLevel}
                                onChange={formik.handleChange}>
                            </TextField>
                            <div className="abilityUpDown">
                                <ArrowDropUpIcon onClick={e => {
                                    formik.setFieldValue("fourPointLevel", formik.values.fourPointLevel+1);
                                    }}>
                                </ArrowDropUpIcon>
                                <ArrowDropDownIcon onClick={e => {
                                    formik.setFieldValue("fourPointLevel", formik.values.fourPointLevel-1);                                        }}>
                                </ArrowDropDownIcon>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>Maximum Point Buy Purchase</div>
                        <div className="optionField">
                            <TextField
                                className="optionInput"
                                type='number' 
                                {...formik.getFieldProps("maxPointBuyStat")}
                                value={formik.values.maxPointBuyStat}
                                onChange={formik.handleChange}>
                            </TextField>
                            <div className="abilityUpDown">
                                <ArrowDropUpIcon onClick={e => {
                                    formik.setFieldValue("maxPointBuyStat", formik.values.maxPointBuyStat+1);
                                    }}>
                                </ArrowDropUpIcon>
                                <ArrowDropDownIcon onClick={e => {
                                    formik.setFieldValue("maxPointBuyStat", formik.values.maxPointBuyStat-1);                                        }}>
                                </ArrowDropDownIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
            </form>
        </main>
    );
  }