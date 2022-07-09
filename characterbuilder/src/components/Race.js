import React from "react";
import "./Race.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

export default function Race() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { 
            race: "Human",
            racial1: "Select an ability",
            racial2: "Select an ability",
            racial3: "Select an ability",
            racial4: "Select an ability",
            rawstr: 8,
            rawdex: 8,
            rawcon: 8,
            rawint: 8,
            rawwis: 8,
            rawcha: 8,
            str: 8,
            dex: 8,
            con: 8,
            int: 8,
            wis: 8,
            cha: 8,
            },

        validationSchema: Yup.object({
          race: Yup.string(),
          racial1: Yup.string().notOneOf([Yup.ref('racial2'),Yup.ref('racial3'),Yup.ref('racial4')],"Cannot have two racial boosts on the same ability"),
          racial2: Yup.string().notOneOf([Yup.ref('racial1'),Yup.ref('racial3'),Yup.ref('racial4')],"Cannot have two racial boosts on the same ability"),
          racial3: Yup.string().notOneOf([Yup.ref('racial1'),Yup.ref('racial2'),Yup.ref('racial4')],"Cannot have two racial boosts on the same ability"),
          racial4: Yup.string().notOneOf([Yup.ref('racial1'),Yup.ref('racial2'),Yup.ref('racial3')],"Cannot have two racial boosts on the same ability"),
          rawstr: Yup.number().min(3, "Abilities cannot be lower than 3").max(18, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawdex: Yup.number().min(3, "Abilities cannot be lower than 3").max(18, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawcon: Yup.number().min(3, "Abilities cannot be lower than 3").max(18, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawint: Yup.number().min(3, "Abilities cannot be lower than 3").max(18, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawwis: Yup.number().min(3, "Abilities cannot be lower than 3").max(18, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          rawcha: Yup.number().min(3, "Abilities cannot be lower than 3").max(18, "Abilities cannot be greater than 18 before racial modifiers").required("Required"),
          str: Yup.number(),
          dex: Yup.number(),
          con: Yup.number(),
          int: Yup.number(),
          wis: Yup.number(),
          cha: Yup.number(),
        }),

        onSubmit: (values) => {
          console.log(values);
          localStorage.setItem("raceandstats", JSON.stringify(values));
        },
      });

    return (
        <main>
            <form
                onBlur={formik.handleSubmit}
                className="framecontainer"
            >
                <div className="racebox">Race
                    <Select
                        id='race' 
                        {...formik.getFieldProps("race")} 
                        value={formik.values.race}
                        onChange={e => {
                            formik.handleChange(e)
                            formik.setFieldValue("racial1", "Select an ability")
                            formik.setFieldValue("racial2", "Select an ability")
                            formik.setFieldValue("racial3", "Select an ability")
                            formik.setFieldValue("racial4", "Select an ability")
                        }}
                    >
                        <MenuItem value="Human">Human</MenuItem>
                        <MenuItem value="Human (variant)">Human (variant)</MenuItem>
                        <MenuItem value="Elf">Elf</MenuItem>
                        <MenuItem value="Hill Dwarf">Hill Dwarf</MenuItem>
                        <MenuItem value="Mountain Dwarf">Mountian Dwarf</MenuItem>
                        <MenuItem value="Gnome">Gnome</MenuItem>
                        <MenuItem value="Half-Elf">Half-Elf</MenuItem>
                    </Select>
                    {(
                        formik.values.race==="Elf" ||
                        formik.values.race==="Hill Dwarf" ||
                        formik.values.race==="Mountain Dwarf" ||
                        formik.values.race==="Gnome" ||
                        formik.values.race==="Half-Elf"
                    ) ? (
                        <div>Racial Boost +2
                            <Select
                                id='racial1'
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
                            {(formik.values.racial1!=="Select an ability" && formik.errors.racial1) ? (<span>Multiple Racial Boosts cannot be applied to the same ability</span>) : null}
                        </div>
                    ) : null}
                    {(
                        formik.values.race==="Mountain Dwarf"
                    ) ? (
                        <div>Racial Boost +2
                            <Select
                                id='racial2'
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
                            {(formik.values.racial2!=="Select an ability" && formik.errors.racial2) ? (<span>Multiple Racial Boosts cannot be applied to the same ability</span>) : null}
                        </div>
                    ) : null}
                                        {(
                        formik.values.race==="Elf" ||
                        formik.values.race==="Hill Dwarf" ||
                        formik.values.race==="Half-Elf" ||
                        formik.values.race==="Gnome" ||
                        formik.values.race==="Human (variant)"
                    ) ? (
                        <div>Racial Boost +1
                            <Select
                                id='racial3'
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
                            {(formik.values.racial3!=="Select an ability" && formik.errors.racial3) ? (<span>Multiple Racial Boosts cannot be applied to the same ability</span>) : null}
                        </div>
                        ) : null}
                    {(
                        formik.values.race==="Half-Elf" ||
                        formik.values.race==="Human (variant)"
                    ) ? (
                        <div>Racial Boost +1
                            <Select
                                id='racial4'
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
                            {(formik.values.racial4!=="Select an ability" && formik.errors.racial4) ? (<span>Multiple Racial Boosts cannot be applied to the same ability</span>) : null}
                        </div>                  
                    ) : null}
                </div>
                <div className="statbox">
                    <div className="statheader"><span>Ability</span><span>Total</span></div>
                    <div>
                    Strength
                    <TextField
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("rawstr")}
                        value={formik.values.rawstr}
                        onChange={formik.handleChange}>
                    </TextField>
                    {formik.touched.rawstr && formik.errors.rawstr ? (<span>{formik.errors.rawstr}</span>) : null}
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("str")}
                        onChange={formik.handleChange}
                        value={formik.values.rawstr+((formik.values.racial1==="Strength" || formik.values.racial2==="Strength") ? 2 
                        : (formik.values.racial3==="Strength" || formik.values.racial4==="Strength" || formik.values.race==="Human") ? 1 
                        : 0)}>
                    </TextField>
                    </div>
                    <div>
                    Dexterity
                    <TextField 
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("rawdex")}
                        value={formik.values.rawdex}
                        onChange={formik.handleChange}>
                    </TextField>
                    {formik.touched.rawdex && formik.errors.rawdex ? (<span>{formik.errors.rawdex}</span>) : null}
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("dex")}
                        value={formik.values.rawdex + ((formik.values.racial1==="Dexterity" || formik.values.racial2==="Dexterity") ? 2 
                        : (formik.values.racial3==="Dexterity" || formik.values.racial4==="Dexterity" || formik.values.race==="Human") ? 1 
                        : 0)}
                        onChange={formik.handleChange}>
                    </TextField>
                    </div>
                    <div>
                    Constitution
                    <TextField 
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("rawcon")}
                        value={formik.values.rawcon}
                        onChange={formik.handleChange}>
                    </TextField>
                    {formik.touched.rawcon && formik.errors.rawcon ? (<span>{formik.errors.rawcon}</span>) : null}
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("con")}
                        value={formik.values.rawcon + ((formik.values.racial1==="Constitution" || formik.values.racial2==="Constitution") ? 2 
                        : (formik.values.racial3==="Constitution" || formik.values.racial4==="Constitution" || formik.values.race==="Human") ? 1 
                        : 0)}
                        onChange={formik.handleChange}>
                    </TextField>
                    </div>
                    <div>
                    Intelligence
                    <TextField 
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("rawint")}
                        value={formik.values.rawint}
                        onChange={formik.handleChange}>
                    </TextField>
                    {formik.touched.rawint && formik.errors.rawint ? (<span>{formik.errors.rawint}</span>) : null}
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("int")}
                        value={formik.values.rawint + ((formik.values.racial1==="Intelligence" || formik.values.racial2==="Intelligence") ? 2 
                        : (formik.values.racial3==="Intelligence" || formik.values.racial4==="Intelligence" || formik.values.race==="Human") ? 1 
                        : 0)}
                        onChange={formik.handleChange}>
                    </TextField>
                    </div>
                    <div>
                    Wisdom
                    <TextField 
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("rawwis")}
                        value={formik.values.rawwis}
                        onChange={formik.handleChange}>
                    </TextField>
                    {formik.touched.rawwis && formik.errors.rawwis ? (<span>{formik.errors.rawwis}</span>) : null}
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("wis")}
                        value={formik.values.rawwis + ((formik.values.racial1==="Wisdom" || formik.values.racial2==="Wisdom") ? 2 
                        : (formik.values.racial3==="Wisdom" || formik.values.racial4==="Wisdom" || formik.values.race==="Human") ? 1 
                        : 0)}
                        onChange={formik.handleChange}>
                    </TextField>
                    </div>
                    <div>
                    Charisma
                    <TextField 
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("rawcha")}
                        value={formik.values.rawcha}
                        onChange={formik.handleChange}>
                    </TextField>
                    {formik.touched.rawcha && formik.errors.rawcha ? (<span>{formik.errors.rawcha}</span>) : null}
                    <TextField
                        InputProps={{
                            readOnly: true,
                        }}
                        className='abilityscore' 
                        type='number' 
                        {...formik.getFieldProps("cha")}
                        value={formik.values.rawcha + ((formik.values.racial1==="Charisma" || formik.values.racial2==="Charisma") ? 2 
                        : (formik.values.racial3==="Charisma" || formik.values.racial4==="Charisma" || formik.values.race==="Human") ? 1 
                        : 0)}
                        onChange={formik.handleChange}>
                    </TextField>
                    </div>   
                    <div>Point Buy {(
                        formik.values.rawstr>15 ||
                        formik.values.rawstr<8  ||
                        formik.values.rawdex>15 ||
                        formik.values.rawdex<8  ||
                        formik.values.rawcon>15 ||
                        formik.values.rawcon<8  ||
                        formik.values.rawint>15 ||
                        formik.values.rawint<8  ||
                        formik.values.rawwis>15 ||
                        formik.values.rawwis<8  ||
                        formik.values.rawcha>15 ||
                        formik.values.rawcha<8
                        ) 
                        ? "NA" : (
                            formik.values.rawstr - 8 +
                            formik.values.rawdex - 8 +
                            formik.values.rawcon - 8 +
                            formik.values.rawint - 8 +
                            formik.values.rawwis - 8 +
                            formik.values.rawcha - 8 +
                            (formik.values.rawstr>13 ? formik.values.rawstr-13 : 0) +
                            (formik.values.rawdex>13 ? formik.values.rawdex-13 : 0) +
                            (formik.values.rawcon>13 ? formik.values.rawcon-13 : 0) +
                            (formik.values.rawint>13 ? formik.values.rawint-13 : 0) +
                            (formik.values.rawwis>13 ? formik.values.rawwis-13 : 0) +
                            (formik.values.rawcha>13 ? formik.values.rawcha-13 : 0)
                        )}/27</div>
                </div>
            </form>
            <button className='next' onClick={() => {
                        navigate("/class");
                    }}>Next: Class</button>
        </main>
    );
  }