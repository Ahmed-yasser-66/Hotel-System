import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('Cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cannot load Cabins');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  console.log(hasImagePath);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

  //1.Create/Edit Cabin
  let query = supabase.from('Cabins');

  //A) Create Cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //B) Edit Cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin cannot be created');
  }

  if (hasImagePath) return data;

  //upload Image

  const { error: storageError } = await supabase.storage
    .from('cabins-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from('Cabins').delete().eq('id', data.id);

    console.error(storageError);
    throw new Error('Cabin image could not be uploaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('Cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('cabin could not be delted');
  }

  return data;
}
