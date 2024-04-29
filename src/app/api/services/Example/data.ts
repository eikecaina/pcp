// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from "axios";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    //database
  const body = req.body;  
  console.log(body);
  res.status(204).send(null);
}

export async function GeAllData() {
  try {
    let res = { success: true}
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return true;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetDataFromId(id: number, formData: any) {
  try {
    console.log(id)
    console.log(formData)
    let res = { success: true}
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return true;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetDataCommmentsForId(id: number, formData: any) {
  try {
    console.log(id)
    console.log(formData)
    let res = { success: true}
    fetch('https://jsonplaceholder.typicode.com/todos/1/comments')
    .then(response => response.json())
    .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return true;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function GetDataCommentsWithFilterParam(id: number, formData: any) {
  try {
    console.log(id)
    console.log(formData)
    let res = { success: true}
    let postId = 1;
    let email = "Jayne_Kuhic@sydney.com";
    fetch(`https://jsonplaceholder.typicode.com/todos/1/comments?postId=${postId}`)
    .then(response => response.json())
    .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Save(id: number, formData: any) {
  try {
    console.log(id)
    console.log(formData)
    let res = { success: true}
    fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Update(id: number, formData: any) {
  try {
    let res = { success: true}
    let id = 1
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((response) => response.json())
      .then(json => {console.log(json); res = json;})

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

export async function Delete() {
  try {
    let res = { success: true}
    let id = 1
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    });

    // await axios.get(`https://jsonplaceholder.typicode.com/todos/1`);
    return res;
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}
