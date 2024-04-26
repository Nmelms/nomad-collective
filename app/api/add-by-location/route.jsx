import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../lib/supabaseClient";
import { NextApiResponse } from "next";

export async function POST(req) {
  let data = await req.json();

  let geoJSON = {
    type: "Feature",
    geomentry_type: "Point",
    lat: data.lat,
    lng: data.lng,
    name: data.name,
    // street: data.street,
    // city: data.city,
    // state: data.state,
    // zip: data.zip,
    // description: data.description,
    // imageURLS: data.imageURLS,
    // contributor: data.contributor,
  };

  const insertDataToSupabase = async (geoJSON) => {
    const { data, error } = await supabase
      .from("locations")
      .insert(geoJSON)
      .select("*");
    if (error) {
      return error;
    }
    return data;
  };

  const insertResult = await insertDataToSupabase(geoJSON);

  return NextResponse.json(insertResult);
}

export async function GET() {
  const { data, error } = await supabase.from("locations").select();

  return NextResponse.json(data);
}
