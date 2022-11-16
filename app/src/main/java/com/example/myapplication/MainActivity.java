package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;

import android.os.Bundle;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);


        mRecyclerView = findViewById(R.id.recyclerView);

        listItems = new ArrayList<>();

        fetchStudents();

        // Initialize the adapter and attach it
        mAdapter = new StudentAdaptor(this);
        mRecyclerView.setAdapter(mAdapter);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        mRecyclerView.addItemDecoration(
                new DividerItemDecoration(getBaseContext(), DividerItemDecoration.VERTICAL));

        registerForContextMenu(mRecyclerView);

        checkNetworkConnection();
    }
}