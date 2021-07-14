/*
 * @Description: 
 * @Author: changhong.wang
 * @Date: 2021-07-14 00:42:14
 * @LastEditors: changhong.wang
 * @LastEditTime: 2021-07-14 09:34:05
 */
import React from 'react';
import './index.scss';

const arr = ['Wang', 'Changhong']

export default function Home() {
    return(
        <div>
            <h3>This is renderred From React!</h3>
            <ul className="name-list">
                {
                    arr.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))
                }
            </ul>
        </div>
    )
}