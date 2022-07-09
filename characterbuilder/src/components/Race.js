import React, { useState } from "react";
import "./Race.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Race() {

    const navigate = useNavigate();
    const handleChange = (dropdown) => {
        
    }

    const formik = useFormik({
        initialValues: { 
            race: "Human",
            racial1: "Select an ability",
            racial2: "Select an ability",
            racial3: "Select an ability",
            racial4: "Select an ability",
            str: 8,
            dex: 8,
            con: 8,
            int: 8,
            wis: 8,
            cha: 8
            },
        validationSchema: Yup.object({
          race: Yup.string(),
          racial1: Yup.string(),
          racial2: Yup.string(),
          racial3: Yup.string(),
          racial4: Yup.string(),
          str: Yup.number().min(3, "cannot be lower than 3").max(20, "cannot be greater than 20").required("Required"),
          dex: Yup.number().min(3, "cannot be lower than 3").max(20, "cannot be greater than 20").required("Required"),
          con: Yup.number().min(3, "cannot be lower than 3").max(20, "cannot be greater than 20").required("Required"),
          int: Yup.number().min(3, "cannot be lower than 3").max(20, "cannot be greater than 20").required("Required"),
          wis: Yup.number().min(3, "cannot be lower than 3").max(20, "cannot be greater than 20").required("Required"),
          cha: Yup.number().min(3, "cannot be lower than 3").max(20, "cannot be greater than 20").required("Required"),
        }),
        onChange: (values) => {
            formik.setFieldValue('racial1', 'Select an ability');
            console.log(values.racial1);
        },

        onSubmit: (values) => {
          console.log(values);
          localStorage.setItem("raceandstats", JSON.stringify(values));
        },
      });

    return (
        <main>
            <form onBlur={formik.handleSubmit} className="framecontainer">
                <div className="racebox">Race
                    <select id='race' {...formik.getFieldProps("race")}
                        onChange={formik.handleChange} >
                        <option value="Human">Human</option>
                        <option value="Human (variant)">Human (variant)</option>
                        <option value="Elf">Elf</option>
                        <option value="Hill Dwarf">Hill Dwarf</option>
                        <option value="Mountain Dwarf">Mountian Dwarf</option>
                        <option value="Gnome">Gnome</option>
                        <option value="Half-Elf">Half-Elf</option>
                    </select>
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
                                label="racial1"
                                onChange={handleChange}>
                                <MenuItem value="Select an ability">Select an ability</MenuItem>
                                <MenuItem value="Strength">Strength</MenuItem>
                                <MenuItem value="Dexterity">Dexterity</MenuItem>
                                <MenuItem value="Constitution">Constitution</MenuItem>
                                <MenuItem value="Intelligence">Intelligence</MenuItem>
                                <MenuItem value="Wisdom">Wisdom</MenuItem>
                                <MenuItem value="Charisma">Charisma</MenuItem>
                            </Select>
                        </div>
                    ) : null}
                    {(
                        formik.values.race==="Mountain Dwarf"
                    ) ? (
                        <div>Racial Boost +2
                            <select id='racial2' {...formik.getFieldProps("racial2")}>
                                <option value="Select an ability">Select an ability</option>
                                <option value="Strength">Strength</option>
                                <option value="Dexterity">Dexterity</option>
                                <option value="Constitution">Constitution</option>
                                <option value="Intelligence">Intelligence</option>
                                <option value="Wisdom">Wisdom</option>
                                <option value="Charisma">Charisma</option>
                            </select>
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
                            <select id='racial3' {...formik.getFieldProps("racial3")}>
                                <option value="Select an ability">Select an ability</option>
                                <option value="Strength">Strength</option>
                                <option value="Dexterity">Dexterity</option>
                                <option value="Constitution">Constitution</option>
                                <option value="Intelligence">Intelligence</option>
                                <option value="Wisdom">Wisdom</option>
                                <option value="Charisma">Charisma</option>
                            </select>
                        </div>
                        ) : null}
                    {(
                        formik.values.race==="Half-Elf" ||
                        formik.values.race==="Human (variant)"
                    ) ? (
                        <div>Racial Boost +1
                            <select id='racial4' {...formik.getFieldProps("racial4")}>
                                <option value="Select an ability">Select an ability</option>
                                <option value="Strength">Strength</option>
                                <option value="Dexterity">Dexterity</option>
                                <option value="Constitution">Constitution</option>
                                <option value="Intelligence">Intelligence</option>
                                <option value="Wisdom">Wisdom</option>
                                <option value="Charisma">Charisma</option>
                            </select>
                        </div>                   
                    ) : null}
                </div>
                <div className="statbox">
                    <div className="statheader"><span>Ability</span><span>Total</span></div>
                    <div>
                    Strength
                    <input className='abilityscore' type='number' defaultValue='8' {...formik.getFieldProps("str")}></input>
                    {formik.touched.str && formik.errors.str ? (<span>{formik.errors.str}</span>) : null}
                    </div>
                    <div>
                    Dexterity
                    <input className='abilityscore' type='number' defaultValue='8' {...formik.getFieldProps("dex")}></input>
                    {formik.touched.dex && formik.errors.dex ? (<span>{formik.errors.dex}</span>) : null}
                    </div>
                    <div>
                    Constitution
                    <input className='abilityscore' type='number' defaultValue='8' {...formik.getFieldProps("con")}></input>
                    {formik.touched.con && formik.errors.con ? (<span>{formik.errors.con}</span>) : null}
                    </div>
                    <div>
                    Intelligence
                    <input className='abilityscore' type='number' defaultValue='8' {...formik.getFieldProps("int")}></input>
                    {formik.touched.int && formik.errors.int ? (<span>{formik.errors.int}</span>) : null}
                    </div>
                    <div>
                    Wisdom
                    <input className='abilityscore' type='number' defaultValue='8' {...formik.getFieldProps("wis")}></input>
                    {formik.touched.wis && formik.errors.wis ? (<span>{formik.errors.wis}</span>) : null}
                    </div>
                    <div>
                    Charisma
                    <input className='abilityscore' type='number' defaultValue='8' {...formik.getFieldProps("cha")}></input>
                    {formik.touched.cha && formik.errors.cha ? (<span>{formik.errors.cha}</span>) : null}
                    </div>   
                    <div>Point Buy {(
                        formik.values.str>15 ||
                        formik.values.str<8  ||
                        formik.values.dex>15 ||
                        formik.values.dex<8  ||
                        formik.values.con>15 ||
                        formik.values.con<8  ||
                        formik.values.int>15 ||
                        formik.values.int<8  ||
                        formik.values.wis>15 ||
                        formik.values.wis<8  ||
                        formik.values.cha>15 ||
                        formik.values.cha<8
                        ) 
                        ? "NA" : 0}/27</div>
                </div>
            </form>
            <button className='next' onClick={() => {
                        navigate("/class");
                    }}>Next: Class</button>
        </main>
    );
  }